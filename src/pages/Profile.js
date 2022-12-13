import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/Firebase';
import { useUserContext } from '../lib/UserContext';
import UserProfile from '../Components/UserProfile/UserProfile';

function Profile() {
  const {
    user,
    userImg,
    userName,
    profileSaveHandler,
    setUser,
    getSavedProfile,
  } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      !user && navigate('/login');
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user.uid);
    });
  }, []);

  useEffect(() => {
    if (user.length) getSavedProfile();
  }, [user]);

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
