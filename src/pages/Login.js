import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { auth } from '../lib/Firebase';
import SignupForm from '../Components/Login/SignupForm';
import LoginForm from '../Components/Login/LoginForm';
import { MainContext } from '../lib/MainContext';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [logType, setLogType] = useState('signin');
  const { loggedIn } = useContext(MainContext);

  useEffect(() => {
    loggedIn && navigate('/');
  }, [loggedIn]);

  const provider = new GoogleAuthProvider();

  function googleHandler(e) {
    e.preventDefault();
    signInWithRedirect(auth, provider);
  }

  async function submitHandler(e) {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error(error.code);
        const err = error.code;
        switch (err) {
          case 'auth/invalid-email':
            setErrMsg('Please enter a valid email.');
            break;
        }
      });

    const provider = new GoogleAuthProvider();

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
  }

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      {logType === 'signin' ? (
        <SignupForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          setErrMsg={setErrMsg}
          errMsg={errMsg}
          onSubmit={submitHandler}
          onGoogle={googleHandler}
          logType={logType}
          setLogType={setLogType}
        />
      ) : (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          setErrMsg={setErrMsg}
          errMsg={errMsg}
          onSubmit={submitHandler}
          onGoogle={googleHandler}
          logType={logType}
          setLogType={setLogType}
        />
      )}
    </div>
  );
}

export default Login;
