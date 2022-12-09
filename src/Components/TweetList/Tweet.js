import React, { useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/Firebase';
import { MainContext } from '../../lib/MainContext';
import anon from './anon.png';
// import arrow from './img/arrow.svg';

function Tweet() {
  const { user, date, content, id } = useContext(MainContext);
  const userRef = doc(db, 'users', user);
  const [tweetUserName, setTweetUserName] = useState('');
  const [tweetUserImg, setTweetUserImg] = useState('');

  async function getUserName() {
    const user = await getDoc(userRef);
    const { userName } = await user.data();
    const { userImg } = await user.data();
    setTweetUserName(userName);
    if (userImg) setTweetUserImg(userImg);
    else setTweetUserImg(anon);
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
        <div className="d-flex gap-3">
          <img src={tweetUserImg} className="tweet-img" />
          <p className="tweet-username">{tweetUserName}</p>
        </div>
        <p className="tweet-date">{date}</p>
      </div>
      <p className="tweet-text w-75">{content}</p>
    </div>
  );
}

export default Tweet;
