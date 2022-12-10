import { createContext, useContext, useState } from 'react';
import {
  collection,
  doc,
  setDoc,
  getDoc,
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
  async function getSavedName() {
    try {
      const userRef = doc(db, 'users', user);
      const userProfile = await getDoc(userRef);

      if (userProfile.exists()) {
        if (!userProfile.data()) return;
        const userName = await userProfile?.data()?.userName;
        if (!userName) return;
        setSavedName(userName);
        setUserName(userName);
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
        getSavedName,
        addNewUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
