import React, { useContext } from 'react';
import { TweetsContext } from '../../lib/TweetsContext';
import Tweet from './Tweet';
import './TweetList.css';

function TweetList({ error }) {
  const { tweets } = useContext(TweetsContext);

  return (
    <div className="mt-4 tweet-list d-flex flex-column gap-3 w-75">
      {tweets.map(({ id, userName, date, content }) => {
        return (
          <Tweet
            key={id}
            userName={userName}
            date={date}
            content={content}
            error={error}
          />
        );
      })}
    </div>
  );
}

export default TweetList;
