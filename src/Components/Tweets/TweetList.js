import React, { memo, useEffect } from 'react';
import { v4 } from 'uuid';
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
    if (!isFetching || tweetEnd) return;
    nextTweets();
  }, [isFetching]);

  useEffect(() => {
    if (!tweetEnd) window.addEventListener('scroll', handleScroll);
    return () => {
      if (tweetEnd) window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="mt-4 tweet-list d-flex flex-column gap-4 w-75">
      {tweets.map(({ id, user, date, content }) => {
        return (
          <Tweet
            key={id ? id : v4()}
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

export default memo(TweetList);
