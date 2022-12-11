import React, { useEffect, useState, useRef } from 'react';
import { useMainContext } from '../lib/MainContext';
import TweetCreate from '../Components/Tweets/TweetCreate';
import TweetList from '../Components/Tweets/TweetList';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from 'firebase/firestore';
import { auth } from '../lib/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '../lib/Firebase';
import { useNavigate } from 'react-router-dom';

function Home() {
  const {
    tweets,
    setTweets,
    setIsLoading,
    addNewUser,
    user,
    getSavedProfile,
    setLastVisible,
  } = useMainContext();

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
    if (user.length) getSavedProfile();
  }, [tweets]);

  // Call to tweets from firebase server w/ live update

  useEffect(() => {
    setIsLoading(true);
    const tweetsRef = collection(db, 'tweets');
    const data = query(tweetsRef, orderBy('date', 'desc'), limit(10));
    if (!data.empty) {
      const unsubscribe = onSnapshot(data, (snapshot) => {
        const newTweets = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTweets(newTweets);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setIsLoading(false);
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <TweetCreate />
      <TweetList />
    </div>
  );
}

export default Home;
