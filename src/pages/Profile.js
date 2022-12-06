// import { useState, useContext } from 'react';
// import { MainContext } from '../lib/MainContext';
import UserName from '../Components/UserName/UserName';

function User() {
  // const { userName, setUserName, nameSaveHandler } = useContext(MainContext);

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <UserName />
    </div>
  );
}

export default User;
