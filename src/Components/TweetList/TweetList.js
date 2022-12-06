import React, { useContext } from 'react';
import { MainContext } from '../../lib/MainContext';
import Tweet from './Tweet';
import './TweetList.css';

function TweetList() {
  const { tweets } = useContext(MainContext);

  return (
    <div className="mt-4 tweet-list d-flex flex-column gap-3 w-75">
      {tweets.map(({ id, userName, date, content }) => {
        return (
          <MainContext.Provider value={{ userName, date, id, content }}>
            <Tweet />
          </MainContext.Provider>
        );
      })}
    </div>
  );
}

export default TweetList;
