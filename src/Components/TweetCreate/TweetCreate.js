import { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import './TweetCreate.css';
import { MainContext } from '../../lib/MainContext';

function TweetCreate() {
  const {
    tweets,
    setTweets,
    tempTweet,
    setTempTweet,
    setError,
    error,
    isLoading,
    userName,
    user,
    tweetSaveHandler: onTweetSave,
  } = useContext(MainContext);

  const [tweet, setTweet] = useState(tempTweet || '');

  // Tracks tweet's content and length + error msg if it's too long
  function tweetChangeHandler(e) {
    setError('');
    setTweet(e.target.value);
    setTempTweet(e.target.value);
    e.target.value.length > 140 &&
      setError("The tweet can't contain more than 140 chars");
  }

  // Creates a new tweet object on submits and sends to app + resets error msg and textarea content
  function buttonClickHandler() {
    const newTweet = {
      userName: userName ? userName : 'Anonymous',
      user: user,
      content: tweet,
      date: new Date().toLocaleString(),
    };
    onTweetSave(newTweet);
    setTweets([newTweet, ...tweets]);
    setError(error);
    error || setTweet('');
    setTempTweet('');
  }

  return (
    <Form className="new-tweet-form w-75 d-flex flex-column">
      <Form.Control
        as="textarea"
        className="new-tweet-input flex-fill"
        placeholder="Say what's on your mind..."
        value={tweet}
        onChange={tweetChangeHandler}
        onFocus={() => setError('')}
      />
      <div className="w-100 d-flex justify-content-between align-items-center">
        {error ? (
          <Alert variant="danger" className="new-tweet-alert">
            {error}
          </Alert>
        ) : (
          <div />
        )}
        <div className="d-flex align-items-center gap-2">
          {isLoading && <Spinner animation="border" variant="primary" />}
          <Button
            className="new-tweet-button justify-self-end"
            disabled={
              tweet.length > 140 || tweet.length < 1 || isLoading ? true : false
            }
            onClick={buttonClickHandler}
          >
            Tweet
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default TweetCreate;
