import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainContext } from './lib/MainContext';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from './lib/Firebase';
import { auth } from './lib/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
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

  // Get user details
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) addNewUser(user);
    });
  }, []);

  async function addNewUser(user) {
    console.log(user);

    setUser(user.uid);
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log('bye');
      return;
    } else {
      console.log('hi');
      const { email, uid } = user;
      setUserName('');
      setDoc(doc(db, 'users', uid), { email, userName });
    }
  }

  // Saves new name
  function profileSaveHandler(userName, userImg) {
    setUserName(userName);
    setUserImg(userImg);
    updateUserProfile();
  }

  useEffect(() => {
    if (userImg) profileSaveHandler(userName, userImg);
  }, [userImg]);

  // Updates the current username to the name saved in the database
  useEffect(() => {
    if (user.length) getSavedName();
  }, [tweets]);

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

  async function updateUserProfile() {
    const userRef = doc(db, 'users', user);
    if (userRef) {
      await updateDoc(userRef, {
        userName: userName,
        userImg: userImg,
      });
    }
  }

  return (
    <MainContext.Provider
      value={{
        tempTweet,
        setTempTweet,
        tweets,
        setTweets,
        error,
        setError,
        userName,
        setUserName,
        profileSaveHandler,
        tweetSaveHandler,
        isLoading,
        setIsLoading,
        user,
        setUser,
        savedName,
        userImg,
        setUserImg,
        getSavedName,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </MainContext.Provider>
  );
}

export default App;
