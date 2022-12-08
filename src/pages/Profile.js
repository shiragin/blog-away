import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserName from '../Components/UserName/UserName';
import { MainContext } from '../lib/MainContext';

function User() {
  // Check if user is logged in
  const { loggedIn } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    !loggedIn && navigate('/signup');
  }, [loggedIn]);

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <UserName />
    </div>
  );
}

export default User;
