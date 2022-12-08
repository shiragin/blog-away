import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainContext } from './lib/MainContext';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './lib/Firebase';
import { auth } from './lib/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  // States & variables
  const [tweets, setTweets] = useState([]);
  const [tempTweet, setTempTweet] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');

  // Saves new name
  function nameSaveHandler(userName) {
    setUserName(userName);
  }

  // Saves new tweet to server
  async function tweetSaveHandler({ date, content }) {
    setIsLoading(true);
    try {
      await addDoc(collection(db, 'tweets'), {
        content: content,
        userName: userName ? userName : 'Anonynmous',
        date: date,
      });
      setError('');
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  // check if user is signed in

  onAuthStateChanged(auth, (user) => {
    user ? setLoggedIn(true) : setLoggedIn(false);
  });

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
        loggedIn,
        setLoggedIn,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </MainContext.Provider>
  );
}

export default App;
