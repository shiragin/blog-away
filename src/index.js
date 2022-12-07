import React from 'react';
import ReactDOM from 'react-dom/client';
// Import the functions you need from the SDKs you need
// import firebase from 'firebase/app';
// import { collection, addDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyD3iPS3Ir1FGJZx_AgdteOBdupCFjKPX1w',
//   authDomain: 'blog-away-d9900.firebaseapp.com',
//   projectId: 'blog-away-d9900',
//   storageBucket: 'blog-away-d9900.appspot.com',
//   messagingSenderId: '647842182977',
//   appId: '1:647842182977:web:b6a6d891f0f0b80aed93c0',
// };

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const tweetRef = db.collection('tweets');

// db.collection('cats')
//   .add({
//     cat: 'Mulaf',
//     age: 4,
//     hobbies: 'destruction',
//   })
//   // .then((docRef) => {
//   //   console.log('Document written with ID: ', docRef.id);
//   // })
//   .catch((error) => {
//     console.error('Error adding document: ', error);
//   });

// db.collection('cats')
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, ' => ', doc.data());
//     });
//   });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
