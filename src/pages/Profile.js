import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/Firebase';
import { useUserContext } from '../lib/UserContext';
import UserProfile from '../Components/UserProfile/UserProfile';

function Profile() {
  const { userImg, userName, profileSaveHandler } = useUserContext();

  const navigate = useNavigate();

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
