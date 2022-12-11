import React, { useEffect, useState, useRef } from 'react';
import { useMainContext } from '../lib/MainContext';
import TweetCreate from '../Components/Tweets/TweetCreate';
import TweetList from '../Components/Tweets/TweetList';
import {
  collection,
  getDocs,
  query,
  onSnapshot,
  doc,
  orderBy,
  limit,
  startAfter,
  startAt,
  endAt,
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

  const [lastVisible, setLastVisible] = useState('');
  const listInnerRef = useRef();

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

  // Call to tweets from firebase server

  useEffect(() => {
    setIsLoading(true);
    try {
      const tweetsRef = query(
        collection(db, 'tweets'),
        orderBy('date', 'desc'),
        limit(10)
      );
      const unsubscribe = onSnapshot(tweetsRef, (snapshot) => {
        const newTweets = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTweets(newTweets);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        return () => {
          unsubscribe();
        };
      });
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  async function nextTweets() {
    const tweetsRef = collection(db, 'tweets');
    const data = query(
      tweetsRef,
      orderBy('date', 'desc'),
      // startAfter(lastVisible), // Pass the reference
      limit(10)
    );
    // const documents = await getDocs(data);
    // console.log(documents.docs());
    updateTweets(tweetsRef);
  }

  async function updateTweets(tweetsRef) {
    const unsubscribe = onSnapshot(tweetsRef, (snapshot) => {
      const newTweets = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTweets((prev) => {
        return [...newTweets];
      });
    });
  }

  useEffect(() => {
    function handleScroll() {
      if (
        listInnerRef.current.getBoundingClientRect().bottom <=
        window.innerHeight
      ) {
        console.log('hi');
        nextTweets();
      }
    }

    window.addEventListener('scroll', (e) => handleScroll(e));

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="container d-flex flex-column align-items-center my-4"
      ref={listInnerRef}
    >
      <TweetCreate />
      <TweetList />
    </div>
  );
}

export default Home;
