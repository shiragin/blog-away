import { useState, useEffect } from 'react';
import axios from 'axios';
import TweetCreate from './../Components/TweetCreate/TweetCreate';
import TweetList from './../Components/TweetList/TweetList';
import './../App.css';
import { useSearchParams } from 'react-router-dom';

function Home() {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Receives new username from user page
  const [searchparams] = useSearchParams();
  const enteredName = searchparams.get('userName');

  // Handle name change & fetch from local storage
  const [userName, setUserName] = useState('');

  // useEffect(() => {

  // }, []);

  console.log(enteredName, userName);

  console.log(JSON.parse(localStorage.getItem('username')));

  // Sets new name to server on change
  useEffect(() => {
    enteredName &&
      localStorage.setItem('username', JSON.stringify(enteredName));
  }, [enteredName]);

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
    const storedName = JSON.parse(localStorage.getItem('username'));
    storedName && setUserName(storedName);
    fetchData();
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
