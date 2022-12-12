import React, { useEffect } from 'react';
import { useUserContext } from '../lib/UserContext';
import { useTweetContext } from '../lib/TweetContext';
import TweetCreate from '../Components/Tweets/TweetCreate';
import TweetList from '../Components/Tweets/TweetList';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  where,
} from 'firebase/firestore';
import { auth } from '../lib/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '../lib/Firebase';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { tweets, setTweets, setIsLoading, setLastVisible, filterTweets } =
    useTweetContext();

  const { user, getSavedProfile, addNewUser } = useUserContext();

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
  async function fetchData() {
    const tweetsRef = collection(db, 'tweets');
    const data = filterTweets
      ? query(
          tweetsRef,
          where('user', '==', user),
          orderBy('date', 'desc'),
          limit(10)
        )
      : query(tweetsRef, orderBy('date', 'desc'), limit(10));
    if (!data.empty) {
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
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [filterTweets]);

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <TweetCreate />
      <TweetList />
    </div>
  );
}

export default Home;
