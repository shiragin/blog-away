import { createContext, useContext, useState } from 'react';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  startAfter,
  limit,
  getDocs,
  addDoc,
  where,
} from 'firebase/firestore';
import { db } from './Firebase';
import { useUserContext } from './UserContext';

export const TweetContext = createContext();

export function useTweetContext() {
  return useContext(TweetContext);
}

export default function TweetContextProvider({ children }) {
  // States & variables
  const [tweets, setTweets] = useState([]);
  const [tempTweet, setTempTweet] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState('');
  const [isFetching, setIsFetching] = useState('');
  const [tweetEnd, setTweetEnd] = useState(false);
  const [filterTweets, setFilterTweets] = useState(false);
  const [search, setSearch] = useState({
    type: 'tweets',
    input: '',
    on: false,
  });
  const { user } = useUserContext();

  // Saves new tweet to server
  async function tweetSaveHandler(newTweet) {
    setIsLoading(true);
    try {
      await addDoc(collection(db, 'tweets'), newTweet);
      setError('');
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  // gets userID from searched userName and filter tweets by it
  async function getSearchedUserTweets(value) {
    const usersRef = collection(db, 'users');
    const tweetsRef = collection(db, 'tweets');
    const searched = [];
    if (search.type === 'users') {
      const usersQuery = query(
        usersRef,
        where('userNameLower', '>=', value.toLowerCase()),
        where('userNameLower', '<=', value.toLowerCase() + '\uf8ff')
      );
      const dataID = await getDocs(usersQuery);
      dataID.forEach((doc) => {
        searched.push(doc.id);
      });
    }
    console.log(searched);
    const dataTweets = query(tweetsRef, orderBy('date', 'desc'));
    if (!dataTweets) {
      setIsLoading(false);
      return;
    }
    onSnapshot(dataTweets, (snapshot) => {
      let newTweets = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      newTweets =
        search.type === 'users'
          ? newTweets.filter((tweet) => searched.includes(tweet.user))
          : newTweets.filter((tweet) =>
              tweet.content.toLowerCase().includes(value.toLowerCase())
            );
      setTweets(newTweets);
    });
  }

  // Call to tweets from firebase server w/ live update
  async function fetchData(value = '') {
    try {
      const tweetsRef = collection(db, 'tweets');
      const data = filterTweets
        ? query(
            tweetsRef,
            where('user', '==', user),
            orderBy('date', 'desc'),
            limit(10)
          )
        : query(tweetsRef, orderBy('date', 'desc'), limit(10));
      if (!data) {
        setIsLoading(false);
        return;
      }
      const unsubscribe = onSnapshot(data, (snapshot) => {
        let newTweets = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // if (search.on && search.type === 'tweets') {
        //   newTweets = newTweets.filter((tweet) =>
        //     tweet.content.toLowerCase().includes(value.toLowerCase())
        //   );
        // }
        setTweets(newTweets);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setIsLoading(false);
        return () => {
          unsubscribe();
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  // Get next tweets from the db
  async function nextTweets() {
    if (search.on && search.type === 'users')
      getSearchedUserTweets(search.input);
    setIsLoading(true);
    const tweetsRef = collection(db, 'tweets');
    const tweetQuery = filterTweets
      ? query(
          tweetsRef,
          where('user', '==', user),
          orderBy('date', 'desc'),
          startAfter(lastVisible),
          limit(10)
        )
      : query(
          tweetsRef,
          orderBy('date', 'desc'),
          startAfter(lastVisible),
          limit(10)
        );
    const data = await getDocs(tweetQuery);
    if (data.empty) {
      window.removeEventListener('scroll', handleScroll);
      setIsLoading(false);
      setIsFetching(false);
      setTweetEnd(true);
      return;
    }
    let newTweets = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    if (search.on && search.type === 'tweets') {
      newTweets = newTweets.filter((tweet) =>
        tweet.content.toLowerCase().includes(search.input.toLowerCase())
      );
    }
    setTweets((prev) => {
      return [...prev, ...newTweets];
    });
    if (data?.docs[data.docs.length - 1]) {
      setLastVisible(data.docs[data.docs.length - 1]);
    }
    setIsLoading(false);
    setIsFetching(false);
  }

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.offsetHeight - 0.5
    )
      return;
    setIsFetching(true);
  }

  return (
    <TweetContext.Provider
      value={{
        tweets,
        setTweets,
        tempTweet,
        setTempTweet,
        error,
        setError,
        isLoading,
        setIsLoading,
        tweetSaveHandler,
        lastVisible,
        setLastVisible,
        isFetching,
        setIsFetching,
        tweetEnd,
        setTweetEnd,
        nextTweets,
        handleScroll,
        filterTweets,
        setFilterTweets,
        search,
        setSearch,
        fetchData,
        getSearchedUserTweets,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
}
