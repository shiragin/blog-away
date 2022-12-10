import React, { useState } from 'react';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../../lib/Firebase';
import { useMainContext } from '../../lib/MainContext';
import { v4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CheckCircle } from 'react-bootstrap-icons';
import './UserProfile.css';

function UserProfile() {
  const {
    userName,
    setUserName,
    userImg,
    setUserImg,
    getSavedName,
    profileSaveHandler: onProfileSave,
  } = useMainContext();

  const [uploadedImg, setUploadedImg] = useState(null);

  function nameChangeHandler(e) {
    setUserName(e.target.value);
  }

  function imgChangeHandler(e) {
    setUploadedImg(e.target.files[0]);
  }

  // Sets new name (trimmed) locally and to server on change
  function buttonClickHandler() {
    const trimmed = userName.replaceAll(/\s+/g, ' ');
    localStorage.setItem('username', JSON.stringify(trimmed));
    setUserName(trimmed);
    getImgurl();
    console.log(userImg);
    onProfileSave(trimmed, userImg);
    setButtonClicked(true);
    getSavedName();
  }

  // get the img url from storage
  function getImgurl() {
    if (uploadedImg === null) return;

    const storageRef = ref(storage, `img/${uploadedImg.name + v4()}`);
    uploadBytes(storageRef, uploadedImg).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setUserImg(downloadURL);
      });
    });
  }

  // Handles button text
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <Form className="name-form w-75 d-flex flex-column">
      <h1 className="name-title display-6">Profile</h1>
      <Form.Group className="form-group">
        <Form.Label className="name-label">User Name</Form.Label>
        <div className="name-input-box d-flex align-items-center justify-content-end gap-3">
          <Form.Control
            onFocus={() => buttonClicked && setButtonClicked(false)}
            onChange={nameChangeHandler}
            className="name-input"
            type="text"
            placeholder={'Say your name...'}
            value={userName}
          />
          {buttonClicked && <CheckCircle color="var(--blue)" size={30} />}
        </div>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="name-label">User Photo</Form.Label>
        <div className="name-input-box d-flex align-items-center justify-content-end gap-3">
          <Form.Control
            onFocus={() => buttonClicked && setButtonClicked(false)}
            onChange={imgChangeHandler}
            className="name-input"
            type="file"
            placeholder={'Let the world see you!'}
          />
          {buttonClicked && <CheckCircle color="var(--blue)" size={30} />}
        </div>
      </Form.Group>
      <Button
        onClick={buttonClickHandler}
        className="name-submit-button"
        variant="primary"
        disabled={
          userName.trim(' ').length < 1 || userName.trim(' ').length > 60
            ? true
            : false
        }
      >
        {buttonClicked ? 'Saved' : 'Save'}
      </Button>
    </Form>
  );
}

export default UserProfile;
