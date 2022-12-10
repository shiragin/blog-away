import React, { useEffect, useContext } from 'react';
import { MainContext } from '../lib/MainContext';
import TweetCreate from './../Components/TweetCreate/TweetCreate';
import TweetList from './../Components/TweetList/TweetList';
import { collection, getDocs } from 'firebase/firestore';
import { auth } from '../lib/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '../lib/Firebase';
import { useNavigate } from 'react-router-dom';

function Home() {
  const {
    tweets,
    setTweets,
    setIsLoading,
    setError,
    addNewUser,
    user,
    getSavedName,
  } = useContext(MainContext);

  // Check if user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      !user && navigate('/login');
      if (user) addNewUser(user);
    });
  }, []);

  // Updates the current username to the name saved in the database
  useEffect(() => {
    if (user.length) getSavedName();
  }, [tweets]);

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
