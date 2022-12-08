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
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        // ..
      });
  }

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <SignupForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={submitHandler}
        onGoogle={googleHandler}
      />
    </div>
  );
}

export default Signup;
