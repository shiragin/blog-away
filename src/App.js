import { useState, useEffect } from 'react';
import axios from 'axios';
import TweetCreate from './Components/TweetCreate/TweetCreate';
import TweetList from './Components/TweetList/TweetList';
import './App.css';

function App() {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);

  // console.log(loading);

  async function fetchData() {
    try {
      const res = await axios.get(
        `https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`
      );
      setTweets(res?.data?.tweets);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function tweetSaveHandler({ userName, date, content }) {
    try {
      const response = await axios.post(
        'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',
        {
          conent: content,
          userName: userName,
          date: date,
        }
      );
      fetchData();
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <TweetCreate onTweetSave={tweetSaveHandler} error={error} />
      <TweetList tweets={tweets} error={error} />
    </div>
  );
}

export default App;
