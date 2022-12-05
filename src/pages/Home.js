import { useState, useEffect } from 'react';
import axios from 'axios';
import TweetCreate from './../Components/TweetCreate/TweetCreate';
import TweetList from './../Components/TweetList/TweetList';
import './../App.css';

function Home() {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    fetchData();
  }, []);

  // Saves new tweet to server
  async function tweetSaveHandler({ userName, date, content }) {
    try {
      setIsLoading(true);
      await axios.post(
        'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',
        {
          content: content,
          userName: userName,
          date: date,
        }
      );
      fetchData();
      setError('');
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <TweetCreate
        onTweetSave={tweetSaveHandler}
        error={error}
        isLoading={isLoading}
      />
      <TweetList tweets={tweets} error={error} />
    </div>
  );
}

export default Home;
