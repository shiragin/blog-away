import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainContext } from './lib/MainContext';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { collection, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
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
      if (user) {
        setUser(user.uid);
      }
    });
  }, []);

  // Saves new name
  function nameSaveHandler(userName) {
    setUserName(userName);
    updateUsername();
  }

  async function updateUsername() {
    const userRef = doc(db, 'users', user);
    if (userRef) {
      await updateDoc(userRef, {
        userName: userName,
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
        nameSaveHandler,
        tweetSaveHandler,
        isLoading,
        setIsLoading,
        user,
        setUser,
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
