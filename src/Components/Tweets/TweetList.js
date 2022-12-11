import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useMainContext } from '../../lib/MainContext';
import { Spinner } from 'react-bootstrap';
import Tweet from './Tweet';
import './TweetList.css';

function TweetList({ isFetching, setIsFetching, onFetchMore, tweetEnd }) {
  const { tweets } = useMainContext();

  useEffect(() => {
    if (!isFetching) return;
    onFetchMore();
  }, [isFetching]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.offsetHeight - 0.5
    )
      return;
    setIsFetching(true);
    console.log('bottom');
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="mt-4 tweet-list d-flex flex-column gap-4 w-75">
      {tweets.map(({ id, user, date, content }) => {
        return (
          <Tweet key={id ? id : nanoid()} value={{ user, date, id, content }} />
        );
      })}
      {/* {isFetching && (
        <Spinner animation="border" variant="primary" className="my-2" />
      )} */}
      {tweetEnd && <div className="tweet-end">{tweetEnd}</div>}
      <div className="d-flex justify-content-center">
        {tweetEnd ||
          (isFetching && (
            <Spinner
              animation="border"
              variant="primary"
              className="tweet-spinner my-2"
            />
          ))}
      </div>
    </div>
  );
}

export default TweetList;
