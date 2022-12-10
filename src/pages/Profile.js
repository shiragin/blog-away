import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/Firebase';
import { useMainContext } from '../lib/MainContext';
import UserProfile from '../Components/UserProfile/UserProfile';

function Profile() {
  const {
    userImg,
    userName,
    savedName,
    setUserName,
    setUserImg,
    updateUserProfile,
    profileSaveHandler,
  } = useMainContext();
  // Check if user is logged in

  const navigate = useNavigate();

  console.log('From Profile: ', userImg);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      !user && navigate('/login');
    });
  }, []);

  useEffect(() => {
    if (userImg) profileSaveHandler(userName, userImg);
  }, [userImg]);

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <UserProfile />
    </div>
  );
}

export default Profile;
