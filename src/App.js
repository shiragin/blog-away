import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainContext } from './lib/MainContext';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './lib/Firebase';

function App() {
  // States & variables
  const [tweets, setTweets] = useState([]);
  const [tempTweet, setTempTweet] = useState('');
  const [error, setError] = useState('');
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
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Navbar />}></Route> */}
          {/* <Route path="/" /> */}
          <Route path="/" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />

          <Route path="/home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </MainContext.Provider>
  );
}

export default App;
