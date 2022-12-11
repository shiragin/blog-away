import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useMainContext } from '../lib/MainContext';
import TweetCreate from '../Components/Tweets/TweetCreate';
import TweetList from '../Components/Tweets/TweetList';
import Button from 'react-bootstrap/Button';
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
import { Spinner } from 'react-bootstrap';

function Home() {
  const {
    tweets,
    setTweets,
    setIsLoading,
    isLoading,
    setError,
    addNewUser,
    user,
    getSavedProfile,
    userImg,
  } = useMainContext();

  const [lastVisible, setLastVisible] = useState('');
  const [isFetching, setIsFetching] = useState('');
  const [tweetEnd, setTweetEnd] = useState('');
  const ref = useRef();

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

  async function nextTweets() {
    setTweetEnd('');
    setIsLoading(true);
    console.log(lastVisible);
    console.log(tweets);
    const tweetsRef = collection(db, 'tweets');
    const tweetQuery = query(
      tweetsRef,
      orderBy('date', 'desc'),
      startAfter(lastVisible),
      limit(10)
    );
    const data = await getDocs(tweetQuery);
    console.log(data);
    if (data.empty) {
      console.log('no more tweets!');
      setIsLoading(false);
      setIsFetching(false);
      setTweetEnd('No more tweets to show!');
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

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <TweetCreate />
      <TweetList
        onFetchMore={nextTweets}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
        tweetEnd={tweetEnd}
      />
    </div>
  );
}

export default Home;
