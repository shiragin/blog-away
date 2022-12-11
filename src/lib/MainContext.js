import { createContext, useContext, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  addDoc,
  where,
} from 'firebase/firestore';
import { db } from './Firebase';
import { useUserContext } from './UserContext';

export const MainContext = createContext();

export function useMainContext() {
  return useContext(MainContext);
}

export default function MainContextProvider({ children }) {
  // States & variables
  const [tweets, setTweets] = useState([]);
  const [tempTweet, setTempTweet] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState('');
  const [isFetching, setIsFetching] = useState('');
  const [tweetEnd, setTweetEnd] = useState(false);
  const [filterTweets, setFilterTweets] = useState(false);
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

  // Get next tweets from the db
  async function nextTweets() {
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
    <MainContext.Provider
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
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
