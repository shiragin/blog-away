import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { auth } from '../lib/Firebase';
import SignupForm from '../Components/Login/SignupForm';
import { MainContext } from '../lib/MainContext';

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  // const [errMsg, setLogType] = useState('');
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
  }

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <SignupForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        setErrMsg={setErrMsg}
        errMsg={errMsg}
        onSubmit={submitHandler}
        onGoogle={googleHandler}
      />
    </div>
  );
}

export default Signup;
