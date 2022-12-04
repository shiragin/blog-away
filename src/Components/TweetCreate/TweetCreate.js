import { useState } from 'react';
import { nanoid } from 'nanoid';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './TweetCreate.css';

function TweetCreate(props) {
  const [tweet, setTweet] = useState('');

  function tweetChangeHandler(e) {
    setTweet(e.target.value);
  }

  function buttonClickHandler() {
    const newTweet = {
      id: nanoid(),
      text: tweet,
      date: new Date().toDateString(),
      user: 'Stina Stinok',
    };
    props.onTweetSave(newTweet);
    setTweet('');
  }

  return (
    <Form className="new-tweet-form w-75 d-flex flex-column align-items-end">
      <Form.Control
        as="textarea"
        className="new-tweet-input flex-fill"
        placeholder="What you have in mind..."
        value={tweet}
        onChange={tweetChangeHandler}
      />
      <Button
        disabled={tweet.length > 140 ? true : false}
        className="new-tweet-button"
        onClick={buttonClickHandler}
      >
        Tweet
      </Button>
    </Form>
  );
}

export default TweetCreate;
