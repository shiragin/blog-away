import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/Firebase';
import anon from './anon.jpeg';

function Tweet(props) {
  const { user, date, content, id } = props.value;
  const userRef = doc(db, 'users', user);

  const [tweetUserName, setTweetUserName] = useState('');
  const [tweetUserImg, setTweetUserImg] = useState('');
  const [ImgLoading, setImgLoading] = useState(true);

  async function getUserName() {
    const user = await getDoc(userRef);
    const { userName } = user.data();
    const { userImg } = user.data();
    userName ? setTweetUserName(userName) : setTweetUserName('Anon');
    userImg ? setTweetUserImg(userImg) : setTweetUserImg(anon);
  }

  useEffect(() => {
    getUserName();
  }, []);

  const formattedDate = new Date(JSON.parse(date)).toLocaleString('UK');

  return (
    <div
      key={id}
      className="tweet-card d-flex flex-column justify-content-center"
    >
      <div className="tweet-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <img
            src={tweetUserImg}
            className="tweet-img"
            style={{ display: ImgLoading ? 'none' : 'block' }}
            onLoad={() => setImgLoading(false)}
          />
          <p className="tweet-username">{tweetUserName}</p>
        </div>
        <p className="tweet-date">{formattedDate}</p>
      </div>
      <p className="tweet-text w-75">{content}</p>
    </div>
  );
}

export default Tweet;
