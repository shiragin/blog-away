// v9 compat packages are API compatible with v8 code
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD3iPS3Ir1FGJZx_AgdteOBdupCFjKPX1w',
  authDomain: 'blog-away-d9900.firebaseapp.com',
  projectId: 'blog-away-d9900',
  storageBucket: 'blog-away-d9900.appspot.com',
  messagingSenderId: '647842182977',
  appId: '1:647842182977:web:b6a6d891f0f0b80aed93c0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
