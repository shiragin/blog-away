import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/Firebase';
import UserName from '../Components/UserName/UserName';
import { MainContext } from '../lib/MainContext';

function User() {
  // Check if user is logged in

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      !user && navigate('/login');
    });
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <UserName />
    </div>
  );
}

export default User;
