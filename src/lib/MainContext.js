import { createContext, useContext, useState } from 'react';
import {
  collection,
  doc,
  query,
  orderBy,
  startAfter,
  limit,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './Firebase';

export const MainContext = createContext();

export function useMainContext() {
  return useContext(MainContext);
}

export default function MainContextProvider({ children }) {
  // States & variables
  const [tweets, setTweets] = useState([]);
  const [tempTweet, setTempTweet] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [savedName, setSavedName] = useState('');
  const [userImg, setUserImg] = useState('');
  const [lastVisible, setLastVisible] = useState('');
  const [isFetching, setIsFetching] = useState('');
  const [tweetEnd, setTweetEnd] = useState(false);

  // Saves new tweet to server
  async function tweetSaveHandler(newTweet) {
    setIsLoading(true);
    try {
      await addDoc(collection(db, 'tweets'), newTweet);
      setError('');
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  // Saves new name/image upon change
  function profileSaveHandler(userName, userImg) {
    setUserName(userName);
    setUserImg(userImg);
    updateUserProfile();
  }

  // updates the saved user profile
  async function updateUserProfile() {
    const userRef = doc(db, 'users', user);
    if (userRef) {
      await updateDoc(userRef, {
        userName: userName,
        userImg: userImg,
      });
    }
  }

  // gets the user's saved name from db
  async function getSavedProfile() {
    try {
      const userRef = doc(db, 'users', user);
      const userProfile = await getDoc(userRef);

      if (userProfile.exists()) {
        if (!userProfile.data()) return;
        const userImg = await userProfile?.data()?.userImg;
        const userName = await userProfile?.data()?.userName;
        if (userName) {
          setSavedName(userName);
          setUserName(userName);
        }
        if (userImg) setUserImg(userImg);
      } else {
        throw new Error('No such user profile!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  // adds new user to db
  async function addNewUser(user) {
    setUser(user.uid);
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return;
    } else {
      const { email, uid } = user;
      setUserName('');
      setSavedName('');
      setUserImg('');
      setDoc(doc(db, 'users', uid), { email, userName });
    }
  }

  // Get next tweets from the db
  async function nextTweets() {
    setIsLoading(true);
    const tweetsRef = collection(db, 'tweets');
    const tweetQuery = query(
      tweetsRef,
      orderBy('date', 'desc'),
      startAfter(lastVisible),
      limit(10)
    );
    const data = await getDocs(tweetQuery);
    if (data.empty) {
      window.removeEventListener('scroll', handleScroll);
      setIsLoading(false);
      setIsFetching(false);
      setTweetEnd(true);
      return;
    }
    const newTweets = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setTweets((prev) => {
      return [...prev, ...newTweets];
    });
    if (data?.docs[data.docs.length - 1]) {
      setLastVisible(data.docs[data.docs.length - 1]);
    }
    setIsLoading(false);
    setIsFetching(false);
  }

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.offsetHeight - 0.5
    )
      return;
    setIsFetching(true);
  }

  return (
    <MainContext.Provider
      value={{
        tweets,
        setTweets,
        tempTweet,
        setTempTweet,
        error,
        setError,
        user,
        setUser,
        userName,
        setUserName,
        isLoading,
        setIsLoading,
        savedName,
        setSavedName,
        userImg,
        setUserImg,
        tweetSaveHandler,
        profileSaveHandler,
        updateUserProfile,
        getSavedProfile,
        addNewUser,
        lastVisible,
        setLastVisible,
        isFetching,
        setIsFetching,
        tweetEnd,
        setTweetEnd,
        nextTweets,
        handleScroll,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
