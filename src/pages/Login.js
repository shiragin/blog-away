import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from 'firebase/auth';
import { db } from '../lib/Firebase';
import { auth } from '../lib/Firebase';
import LoginForm from '../Components/UserProfile/LoginForm';
import { useUserContext } from '../lib/UserContext';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [logType, setLogType] = useState('login');
  const { userName } = useUserContext();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? navigate('/') : navigate('/login');
    });
  }, []);

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
    if (password !== passwordConfirm) {
      setErrMsg(`Passwords don't match!`);
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        const { email, uid } = user.user;
        setDoc(doc(db, 'users', uid), { email, userName });
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
        passwordConfirm={passwordConfirm}
        setPasswordConfirm={setPasswordConfirm}
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
