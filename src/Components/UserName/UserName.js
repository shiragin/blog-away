import React, { useState, useContext } from 'react';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../../lib/Firebase';
import { MainContext } from '../../lib/MainContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CheckCircle } from 'react-bootstrap-icons';
import './UserName.css';

function UserName() {
  const {
    userName,
    setUserName,
    userImg,
    setUserImg,
    profileSaveHandler: onProfileSave,
  } = useContext(MainContext);

  const [uploadedImg, setUploadedImg] = useState(null);

  function nameChangeHandler(e) {
    setUserName(e.target.value);
  }

  function imgChangeHandler(e) {
    const file = e.name;
    setUploadedImg(file);
  }

  // Sets new name (trimmed) locally and to server on change
  function buttonClickHandler() {
    const trimmed = userName.replaceAll(/\s+/g, ' ');
    localStorage.setItem('username', JSON.stringify(trimmed));
    setUserName(trimmed);
    getImgurl();
    onProfileSave(trimmed, userImg);
    setButtonClicked(true);
  }

  // get the img url from storage
  function getImgurl() {
    if (!uploadedImg) return;
    // console.log(uploadedImg);

    const storageRef = ref(storage, `files/${uploadedImg}`);
    uploadBytes(storageRef, uploadedImg).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log(downloadURL);
        setUserImg(downloadURL);
      });
    });
  }

  // const storageRef = ref(storage, 'some-child');

  // 'file' comes from the Blob or File API
  // uploadBytes(storageRef, file).then((snapshot) => {
  //   console.log('Uploaded a blob or file!');
  // });
  // const storageRef = ref(storage, `files/${uploadedImg}`);
  // const uploadTask = uploadBytes(storageRef, uploadedImg);

  // uploadTask.on('state_changed', () => {
  //   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //     setUserImg(downloadURL);
  //   });
  // });

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
            value={userName ? userName : ''}
          />
          {buttonClicked && <CheckCircle color="var(--blue)" size={30} />}
        </div>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="name-label">User Photo</Form.Label>
        <div className="name-input-box d-flex align-items-center justify-content-end gap-3">
          <Form.Control
            onFocus={() => buttonClicked && setButtonClicked(false)}
            onChange={(e) => imgChangeHandler(e.target?.files[0])}
            className="name-input"
            type="file"
            placeholder={'Let the world see you!'}
            // value={userName ? userName : ''}
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

export default UserName;
