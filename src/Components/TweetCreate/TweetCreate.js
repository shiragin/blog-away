import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/alert';
import Form from 'react-bootstrap/Form';
import './TweetCreate.css';

function TweetCreate(props) {
  const [tweet, setTweet] = useState('');
  const [errorMsg, setErrorMsg] = useState(props.error);
  // const [showError, setShowError] = useState(false);

  useEffect(() => setErrorMsg(props.error), []);

  console.log('Error: ', props.error);
  console.log('ErrorMsg: ', errorMsg);
  function tweetChangeHandler(e) {
    setErrorMsg('');
    setTweet(e.target.value);
    e.target.value.length > 140 &&
      setErrorMsg("The tweet can't contain more then 140 chars");
  }

  function buttonClickHandler() {
    const newTweet = {
      id: nanoid(),
      content: tweet,
      date: new Date().toISOString(),
      userName: 'Shira',
    };
    props.onTweetSave(newTweet);
    setErrorMsg(props.error);
    props.error || setTweet('');
  }
  return (
    <Form className="new-tweet-form w-75 d-flex flex-column">
      <Form.Control
        as="textarea"
        className="new-tweet-input flex-fill"
        placeholder="What you have in mind..."
        value={tweet}
        onChange={tweetChangeHandler}
      />
      <div className="w-100 d-flex justify-content-between align-items-center">
        {errorMsg ? (
          <Alert variant="danger" className="new-tweet-alert">
            {errorMsg}
          </Alert>
        ) : (
          <div />
        )}

        <Button
          className="new-tweet-button justify-self-end"
          disabled={tweet.length > 140 ? true : false}
          onClick={buttonClickHandler}
        >
          Tweet
        </Button>
      </div>
    </Form>
  );
}

export default TweetCreate;
