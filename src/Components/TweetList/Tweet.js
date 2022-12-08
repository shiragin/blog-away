import React, { useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/Firebase';
import { MainContext } from '../../lib/MainContext';

function Tweet() {
  const { user, date, content, id } = useContext(MainContext);
  const userRef = doc(db, 'users', user);
  const [tweetUserName, setTweetUserName] = useState('');

  async function getUserName() {
    const user = await getDoc(userRef);
    const { userName } = await user.data();
    setTweetUserName(userName);
  }

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <div
      key={id}
      className="tweet-card d-flex flex-column justify-content-center"
    >
      <div className="tweet-header d-flex justify-content-between align-items-start">
        <p className="tweet-username">{tweetUserName}</p>
        <p className="tweet-date">{date}</p>
      </div>
      <p className="tweet-text w-75">{content}</p>
    </div>
  );
}

export default Tweet;
