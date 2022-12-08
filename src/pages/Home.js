import React, { useEffect, useContext } from 'react';
import { MainContext } from '../lib/MainContext';
import TweetCreate from './../Components/TweetCreate/TweetCreate';
import TweetList from './../Components/TweetList/TweetList';
import { collection, getDocs } from 'firebase/firestore';
// import { auth } from '../lib/Firebase';
// import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { db } from '../lib/Firebase';

function Home() {
  const { setTweets, setIsLoading, setError, userName, setUserName } =
    useContext(MainContext);

  // Fetch tweets from server

  async function fetchData() {
    setIsLoading(true);
    try {
      const data = await getDocs(collection(db, 'tweets'));
      if (!data.docs.length) throw new Error('No tweets to show!');
      const newTweets = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setTweets(newTweets);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  // Call to fetch username and tweets from server

  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem('username')) || userName);
    fetchData();
  }, []);

  // Set interval to fetch data

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 20000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <TweetCreate />
      <TweetList />
    </div>
  );
}

export default Home;
