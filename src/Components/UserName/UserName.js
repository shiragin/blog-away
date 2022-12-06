import React, { useState, useContext } from 'react';
import { MainContext } from '../../lib/MainContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CheckCircle } from 'react-bootstrap-icons';
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

  // Sets new name (trimmed) locally and to server on change
  function buttonClickHandler() {
    const trimmed = userName.replaceAll(/\s+/g, ' ');
    localStorage.setItem('username', JSON.stringify(trimmed));
    setUserName(trimmed);
    onNameSave(trimmed);
    setButtonClicked(true);
  }

  // Handles button text
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <Form className="name-form w-75 d-flex flex-column">
      <h1 className="name-title display-6">Profile</h1>
      <Form.Group>
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
