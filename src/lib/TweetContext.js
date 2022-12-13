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

  async function getSearchedUserID() {
    const usersRef = collection(db, 'users');
    const usersQuery = query(
      usersRef,
      where('userNameLower', '==', search.input.toLowerCase())
    );
    const data = await getDocs(usersQuery);
    const searched = [];
    data.forEach((doc) => {
      searched.push(doc.id);
    });
    return searched[0] || '';
  }

  // if (search.type === 'tweets') {
  //   data = query(
  //     tweetsRef,
  //     where('content', 'array-contains', search.input),
  //     // where('content', '<=', search.input + '~'),
  //     orderBy('content'),
  //     orderBy('date', 'desc'),
  //     limit(10)
  //   );

  // Call to tweets from firebase server w/ live update
  async function fetchData() {
    try {
      const tweetsRef = collection(db, 'tweets');
      let data = '';
      if (filterTweets) {
        data = query(
          tweetsRef,
          where('user', '==', user),
          orderBy('date', 'desc'),
          limit(10)
        );
      } else if (search.on) {
        if (search.type === 'users') {
          const searchedID = await getSearchedUserID();
          console.log(searchedID);
          if (!searchedID) {
            setIsLoading(false);
            return;
          }
          data = query(
            tweetsRef,
            where('user', '==', searchedID),
            orderBy('date', 'desc'),
            limit(10)
          );
        }
      } else {
        data = query(tweetsRef, orderBy('date', 'desc'), limit(10));
      }
      if (!data) {
        setIsLoading(false);
        return;
      }
      const unsubscribe = onSnapshot(data, (snapshot) => {
        const newTweets = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
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
    if (tweetEnd) {
      setIsLoading(false);
      setIsFetching(false);
      return;
    }
    setIsLoading(true);
    const tweetsRef = collection(db, 'tweets');
    let tweetQuery;
    if (filterTweets) {
      tweetQuery = query(
        tweetsRef,
        where('user', '==', user),
        orderBy('date', 'desc'),
        startAfter(lastVisible),
        limit(10)
      );
    } else if (search.on) {
      if (search.type === 'users') {
        const searchedID = await getSearchedUserID();
        tweetQuery = query(
          tweetsRef,
          where('user', '==', searchedID),
          orderBy('date', 'desc'),
          startAfter(lastVisible),
          limit(10)
        );
      }
    } else {
      tweetQuery = query(
        tweetsRef,
        orderBy('date', 'desc'),
        startAfter(lastVisible),
        limit(10)
      );
    }
    const data = await getDocs(tweetQuery);
    console.log(data);
    if (data.empty) {
      window.removeEventListener('scroll', handleScroll);
      setIsLoading(false);
      setIsFetching(false);
      setTweetEnd(true);
      return;
    }
    const newTweets = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
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
      }}
    >
      {children}
    </TweetContext.Provider>
  );
}
