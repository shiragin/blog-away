import React, { useEffect, useContext } from 'react';
import { MainContext } from '../lib/MainContext';
import axios from 'axios';
import TweetCreate from './../Components/TweetCreate/TweetCreate';
import TweetList from './../Components/TweetList/TweetList';
import './../App.css';

function Home() {
  const { tweetAPI, setTweets, setIsLoading, setError, userName, setUserName } =
    useContext(MainContext);

  // Fetch tweets from server
  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await axios.get(tweetAPI);
      setTweets(res?.data?.tweets);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
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
