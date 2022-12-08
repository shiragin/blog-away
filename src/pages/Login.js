import React, { useState, useEffect, useContext } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { auth } from '../lib/Firebase';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Components/Login/LoginForm';
import { MainContext } from '../lib/MainContext';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loggedIn } = useContext(MainContext);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    loggedIn && navigate('/');
  }, [loggedIn]);

  function googleHandler(e) {
    e.preventDefault();
    signInWithRedirect(auth, provider);
  }

  function LoginHandler(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onLogin={LoginHandler}
        onGoogle={googleHandler}
      />
    </div>
  );
}

export default Login;
