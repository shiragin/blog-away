import React, { useEffect, useContext } from 'react';
import { MainContext } from '../lib/MainContext';
import axios from 'axios';
import TweetCreate from './../Components/TweetCreate/TweetCreate';
import TweetList from './../Components/TweetList/TweetList';
import './../App.css';
import { tweetsRef } from '../lib/Firebase';

function Home() {
  const {
    tweetAPI,
    setTweets,
    tweets,
    setIsLoading,
    setError,
    userName,
    setUserName,
  } = useContext(MainContext);

  // Fetch tweets from server

  function fetchData() {
    const tweetsArray = [];
    setIsLoading(true);
    tweetsRef.get().then((querySnapshot) => {
      querySnapshot.forEach((tweet) => {
        tweetsArray.push(tweet.data());
        setTweets(
          tweetsArray.sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      });
    });
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
    }, 10000);
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
