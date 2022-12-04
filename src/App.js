import { useState, useEffect } from 'react';
import localforage from 'localforage';
import axios from 'axios';
import TweetCreate from './Components/TweetCreate/TweetCreate';
import TweetList from './Components/TweetList/TweetList';
import './App.css';

function App() {
  const [tweets, setTweets] = useState([]);

  async function fetchData() {
    try {
      const res = await axios.get(
        `https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`
      );
      setTweets(res.data.tweets);
    } catch (err) {
      console.log(err);
    }
  }

  async function saveData() {
    console.log(tweets);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    saveData();
  }, [tweets]);

  async function tweetSaveHandler({ userName, date, content }) {
    // setTweets((prevTweets) => {
    //   return [newTweet, ...prevTweets];
    // });
    console.log({ userName, date, content });
    const response = await axios.post(
      'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',
      {
        content: content,
        userName: userName,
        date: date,
      }
    );
    console.log(response.data);
    fetchData();
  }

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <TweetCreate onTweetSave={tweetSaveHandler} />
      <TweetList tweets={tweets} />
    </div>
  );
}

export default App;
