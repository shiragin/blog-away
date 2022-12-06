import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

  function nameSaveHandler(userName) {
    setUserName(userName);
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
        // tweetSaveHandler,
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
