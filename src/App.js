import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { MainContext } from './lib/MainContext';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './App.css';

function App() {
  const [tweets, setTweets] = useState([]);
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
      await axios.post(
        'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',
        {
          content: content,
          userName: userName,
          date: date,
        }
      );
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
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MainContext.Provider>
  );
}

export default App;
