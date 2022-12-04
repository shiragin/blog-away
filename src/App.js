import { useState, useEffect } from 'react';
import localforage from 'localforage';
import TweetCreate from './Components/TweetCreate/TweetCreate';
import TweetList from './Components/TweetList/TweetList';
import './App.css';

function App() {
  const [tweets, setTweets] = useState([]);

  function fetchData() {
    localforage.getItem('tweets').then((res) => {
      setTweets(res ? res : []);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localforage.setItem('tweets', tweets);
  }, [tweets]);

  function tweetSaveHandler(newTweet) {
    setTweets((prevTweets) => {
      return [newTweet, ...prevTweets];
    });
  }

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <TweetCreate onTweetSave={tweetSaveHandler} />
      <TweetList tweets={tweets} />
    </div>
  );
}

export default App;
