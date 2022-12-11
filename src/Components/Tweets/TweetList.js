import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useTweetContext } from '../../lib/TweetContext';
import { Spinner } from 'react-bootstrap';
import Tweet from './Tweet';
import './TweetList.css';

function TweetList() {
  const {
    tweets,
    isFetching,
    tweetEnd,
    nextTweets,
    handleScroll,
    filterTweets,
  } = useTweetContext();

  useEffect(() => {
    if (!isFetching) return;
    nextTweets();
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      if (tweetEnd) window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="mt-4 tweet-list d-flex flex-column gap-4 w-75">
      {tweets.map(({ id, user, date, content }) => {
        return (
          <Tweet
            key={id ? id : nanoid()}
            value={{ user, date, id, content, filterTweets }}
          />
        );
      })}
      <div className="tweet-end d-flex justify-content-center">
        {tweetEnd && 'No more tweets to show!'}
        {tweetEnd ||
          (isFetching && <Spinner animation="border" variant="primary" />)}
      </div>
    </div>
  );
}

export default TweetList;
