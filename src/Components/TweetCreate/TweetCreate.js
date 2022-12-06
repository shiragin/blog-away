import { useState, useEffect, useContext } from 'react';
import { nanoid } from 'nanoid';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import './TweetCreate.css';
import { MainContext } from '../../lib/MainContext';

function TweetCreate() {
  const [tweet, setTweet] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    tweets,
    setTweets,
    error,
    isLoading,
    userName,
    tweetSaveHandler: onTweetSave,
  } = useContext(MainContext);

  // Updates error message whenever a tweet is submitted
  useEffect(() => setErrorMsg(error), [onTweetSave]);

  // Tracks tweet's content and length + error msg if it's too long
  function tweetChangeHandler(e) {
    setErrorMsg('');
    setTweet(e.target.value);
    e.target.value.length > 140 &&
      setErrorMsg("The tweet can't contain more than 140 chars");
  }

  // Creates a new tweet object on submits and sends to app + resets error msg and textarea content
  function buttonClickHandler() {
    const newTweet = {
      id: nanoid(),
      userName: userName,
      content: tweet,
      date: new Date().toISOString(),
    };
    onTweetSave(newTweet);
    setTweets([newTweet, ...tweets]);
    setErrorMsg(error);
    error || setTweet('');
  }

  return (
    <Form className="new-tweet-form w-75 d-flex flex-column">
      <Form.Control
        as="textarea"
        className="new-tweet-input flex-fill"
        placeholder="Say what's on your mind..."
        value={tweet}
        onChange={tweetChangeHandler}
        onFocus={() => setErrorMsg('')}
      />
      <div className="w-100 d-flex justify-content-between align-items-center">
        {errorMsg ? (
          <Alert variant="danger" className="new-tweet-alert">
            {errorMsg}
          </Alert>
        ) : (
          <div />
        )}
        <div className="d-flex align-items-center gap-2">
          {isLoading && <Spinner animation="border" variant="primary" />}
          <Button
            className="new-tweet-button justify-self-end"
            disabled={tweet.length > 140 || isLoading ? true : false}
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
