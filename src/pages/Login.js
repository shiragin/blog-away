import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { auth } from '../lib/Firebase';
import LoginForm from '../Components/Login/LoginForm';
import { MainContext } from '../lib/MainContext';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [logType, setLogType] = useState('signup');
  const { loggedIn } = useContext(MainContext);

  useEffect(() => {
    loggedIn && navigate('/');
  }, [loggedIn]);

  const provider = new GoogleAuthProvider();

  function loginHandler(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        const err = error.code;
        displayError(err);
      });
  }

  function googleHandler(e) {
    e.preventDefault();
    signInWithRedirect(auth, provider);
  }

  async function signupHandler(e) {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        const err = error.code;
        displayError(err);
      });
  }

  function displayError(error) {
    switch (error) {
      case 'auth/invalid-email':
        setErrMsg('Please enter a valid email address');
        break;
      case 'auth/weak-password':
        setErrMsg(`Please choose a stronger password (hint: not '1234')`);
        break;
      case 'auth/email-already-in-use':
        setErrMsg('User already exists. Try Logging in?');
        break;
      case 'auth/wrong-password':
        setErrMsg('Oh my, wrong password!');
        break;
      case 'auth/user-not-found':
        setErrMsg(`User doesn't exist. Check your spelling?`);
        break;
      default:
        break;
    }
  }

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        setErrMsg={setErrMsg}
        errMsg={errMsg}
        onLogin={loginHandler}
        onSignup={signupHandler}
        onGoogle={googleHandler}
        logType={logType}
        setLogType={setLogType}
      />
    </div>
  );
}

export default Login;
