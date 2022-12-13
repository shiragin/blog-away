import React, { createContext, useContext, useState } from 'react';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './Firebase';

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');
  const [savedName, setSavedName] = useState('');
  const [userImg, setUserImg] = useState('');
  const [logType, setLogType] = useState('login');

  // Saves new name/image upon change
  function profileSaveHandler(userName, userImg) {
    setUserName(userName);
    setUserImg(userImg);
    updateUserProfile();
  }

  // updates the saved user profile
  async function updateUserProfile() {
    const userRef = doc(db, 'users', user);
    if (userRef) {
      await updateDoc(userRef, {
        userName: userName,
        userNameLower: userName.toLowerCase(),
        userImg: userImg,
        id: user,
      });
    }
  }

  // gets the user's saved name from db
  async function getSavedProfile() {
    try {
      const userRef = doc(db, 'users', user);
      const userProfile = await getDoc(userRef);

      if (userProfile.exists()) {
        if (!userProfile.data()) return;
        const userImg = await userProfile?.data()?.userImg;
        const userName = await userProfile?.data()?.userName;
        if (userName) {
          setSavedName(userName);
          setUserName(userName);
        }
        if (userImg) setUserImg(userImg);
      } else {
        throw new Error('No such user profile!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  // adds new user to db
  async function addNewUser(user) {
    setUser(user.uid);
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return;
    } else {
      const { email, uid } = user;
      setUserName('');
      setSavedName('');
      setUserImg('');
      setDoc(doc(db, 'users', uid), { email, userName, uid });
    }
  }

  return (
    <UserContext.Provider
      value={{
        logType,
        setLogType,
        setUser,
        user,
        userName,
        setUserName,
        savedName,
        setSavedName,
        userImg,
        setUserImg,
        profileSaveHandler,
        updateUserProfile,
        getSavedProfile,
        addNewUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
