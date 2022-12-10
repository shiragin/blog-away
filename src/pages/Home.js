import React, { useEffect } from 'react';
import { useMainContext } from '../lib/MainContext';
import TweetCreate from '../Components/Tweets/TweetCreate';
import TweetList from '../Components/Tweets/TweetList';
import {
  collection,
  getDocs,
  query,
  onSnapshot,
  doc,
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
    setError,
    addNewUser,
    user,
    getSavedProfile,
    userImg,
  } = useMainContext();

  console.log('From Home: ', userImg);

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

  // Fetch tweets from server

  async function fetchData() {
    setIsLoading(true);
    try {
      const data = await getDocs(collection(db, 'tweets'));
      if (!data.docs.length) throw new Error('No tweets to show!');
      console.log(data.docs);
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

  // Call to tweets from firebase server

  useEffect(() => {
    fetchData();
  }, []);

  // sets a listerner for tweets updates from server

  useEffect(() => {
    const tweetsRef = collection(db, 'tweets');
    console.log('hi');
    const unsubscribe = onSnapshot(tweetsRef, (snapshot) => {
      const newTweets = snapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setTweets(newTweets);
      console.log(snapshot.docs);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // async function updateData() {
  //   setIsLoading(true);
  //   console.log(tweets);
  //   try {
  //     const data = await query(collection(db, 'tweets'));
  //     const newTweets = onSnapshot(data, (querySnapshot) => {
  //       querySnapshot.docs.map((doc) => setTweets(doc, ...tweets));
  //     });
  //     console.log(tweets);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  //   setIsLoading(false);
  // }

  // Set interval to fetch data

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 20000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <TweetCreate />
      <TweetList />
    </div>
  );
}

export default Home;
