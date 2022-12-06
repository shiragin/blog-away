import React, { useState, useContext } from 'react';
import { MainContext } from '../../lib/MainContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UserName.css';

function UserName() {
  const {
    userName,
    setUserName,
    nameSaveHandler: onNameSave,
  } = useContext(MainContext);

  function nameChangeHandler(e) {
    setUserName(e.target.value);
  }

  // Sets new name locally and to server on change
  function buttonClickHandler() {
    localStorage.setItem('username', JSON.stringify(userName));
    onNameSave(userName);
    setButtonClicked(!buttonClicked);
  }

  // Handles button text
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <Form className="name-form w-75 d-flex flex-column">
      <h1 className="name-title display-6">Profile</h1>
      <Form.Group>
        <Form.Label className="name-label">User Name</Form.Label>
        <Form.Control
          onFocus={() => buttonClicked && setButtonClicked(false)}
          onChange={nameChangeHandler}
          className="name-input"
          type="text"
          placeholder={'Say your name...'}
          value={userName ? userName : ''}
        />
      </Form.Group>
      <Button
        onClick={buttonClickHandler}
        className="name-submit-button"
        variant="primary"
        disabled={userName.trim(' ').length < 1 ? true : false}
      >
        {buttonClicked ? 'Saved' : 'Save'}
      </Button>
    </Form>
  );
}

export default UserName;
