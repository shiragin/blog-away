import React, { useRef, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { useMainContext } from '../../lib/MainContext';
import Tweet from './Tweet';
import './TweetList.css';

function TweetList({ isFetching, setIsFetching, onFetchMore }) {
  const { tweets } = useMainContext();
  const listInnerRef = useRef();

  useEffect(() => {
    if (!isFetching) return;
    onFetchMore();
  }, [isFetching]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.offsetHeight - 1
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
    </div>
  );
}

export default TweetList;
