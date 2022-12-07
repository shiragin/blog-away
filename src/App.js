import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { MainContext } from './lib/MainContext';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import firebase from 'firebase/app';
import { addDoc } from 'firebase/firestore';
import { tweetsRef } from './lib/Firebase';
import { catsRef } from './lib/Firebase';

function App() {
  // catsRef.get().then((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, ' => ', doc.data());
  //   });
  // });

  // States & variables
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const tweetAPI =
    'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet';

  // Saves new name
  function nameSaveHandler(userName) {
    setUserName(userName);
  }

  // Saves new tweet to server
  function tweetSaveHandler({ date, content }) {
    setIsLoading(true);
    tweetsRef
      .add({
        content: content,
        userName: userName ? userName : 'Anonynmous',
        date: date,
      })
      .then(() => {
        setError('');
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
    // try {
    //   // await axios.post(tweetAPI, {
    //   //   content: content,
    //   //   userName: userName ? userName : 'Anonynmous',
    //   //   date: date,
    //   // });
    //   const docRef = await firebase.addDoc(firebase.collection(tweetsRef), {
    //     content: content,
    //     userName: userName ? userName : 'Anonynmous',
    //     date: date,
    //   });
    //   // console.log('Document written with ID: ', docRef.id);
    //   setError('');
    //   setIsLoading(false);
    // } catch (error) {
    setError(error.message);
    setIsLoading(false);
    // }
  }

  return (
    <MainContext.Provider
      value={{
        tweetAPI,
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
