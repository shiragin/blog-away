import React, { useEffect, useContext } from 'react';
import { MainContext } from '../lib/MainContext';
import axios from 'axios';
import TweetCreate from './../Components/TweetCreate/TweetCreate';
import TweetList from './../Components/TweetList/TweetList';
import './../App.css';

function Home() {
  const {
    tweets,
    setTweets,
    isLoading,
    setIsLoading,
    error,
    setError,
    userName,
    setUserName,
  } = useContext(MainContext);

  console.log(userName);

  // Fetch tweets from server
  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`
      );
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
      console.log('fetching');
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Saves new tweet to server
  async function tweetSaveHandler({ date, content }) {
    setIsLoading(true);
    try {
      await axios.post(
        'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',
        {
          content: content,
          userName: userName,
          date: date,
        }
      );
      setError('');
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  return (
    <MainContext.Provider
      value={{
        tweets,
        setTweets,
        error,
        tweetSaveHandler,
        isLoading,
        userName,
      }}
    >
      <div className="container d-flex flex-column align-items-center my-4">
        <TweetCreate />
        <TweetList />
      </div>
    </MainContext.Provider>
  );
}

export default Home;
