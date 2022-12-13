import React, { useState } from 'react';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../../lib/Firebase';
import { useUserContext } from '../../lib/UserContext';
import { v4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CheckCircle } from 'react-bootstrap-icons';
import './UserProfile.css';
import anon from '../Tweets/anon.jpeg';

function UserProfile() {
  const {
    user,
    userName,
    setUserName,
    userImg,
    setUserImg,
    getSavedProfile,
    profileSaveHandler: onProfileSave,
  } = useUserContext();

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
    setUserName(trimmed);
    getImgurl();
    onProfileSave(trimmed, userImg);
    setButtonClicked(true);
    getSavedProfile();
  }

  // get the img url and puts it in firebase storage
  function getImgurl() {
    if (uploadedImg === null) return;

    const storageRef = ref(storage, `img/${user}/${uploadedImg.name + v4()}`);
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
      <img className="profile-img align-self-center" src={userImg || anon} />
      <h1 className="name-title display-6 align-self-center mt-3">Profile</h1>
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
