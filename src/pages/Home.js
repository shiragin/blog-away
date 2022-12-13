import React, { useEffect } from 'react';
import { useUserContext } from '../lib/UserContext';
import { useTweetContext } from '../lib/TweetContext';
import TweetCreate from '../Components/Tweets/TweetCreate';
import TweetList from '../Components/Tweets/TweetList';
// import {
//   collection,
//   query,
//   onSnapshot,
//   orderBy,
//   limit,
//   where,
// } from 'firebase/firestore';
import { auth } from '../lib/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
// import { db } from '../lib/Firebase';
import { useNavigate } from 'react-router-dom';

function Home() {
  const {
    tweets,
    // setTweets,
    setIsLoading,
    // setLastVisible,
    filterTweets,
    fetchData,
    search,
    setSearch,
  } = useTweetContext();

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

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [search]);

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
