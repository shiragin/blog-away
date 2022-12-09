import React, { useContext } from 'react';
import { nanoid } from 'nanoid';
import { MainContext } from '../../lib/MainContext';
import Tweet from './Tweet';
import './TweetList.css';

function TweetList() {
  const { tweets } = useContext(MainContext);

  return (
    <div className="mt-4 tweet-list d-flex flex-column gap-4 w-75">
      {tweets.map(({ id, user, date, content }) => {
        return (
          <MainContext.Provider
            key={id ? id : nanoid()}
            value={{ user, date, id, content }}
          >
            <Tweet />
          </MainContext.Provider>
        );
      })}
    </div>
  );
}

export default TweetList;
