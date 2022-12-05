import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UserName.css';

function UserName(props) {
  const [userName, setUserName] = useState('');

  function nameChangeHandler(e) {
    setUserName(e.target.value);
  }

  function buttonClickHandler() {
    props.onNameSave(userName);
  }

  return (
    <Form className="name-form w-75 d-flex flex-column">
      <h1 className="name-title display-6">Profile</h1>
      <Form.Group>
        <Form.Label className="name-label">User Name</Form.Label>
        <Form.Control
          onChange={nameChangeHandler}
          className="name-input"
          type="text"
          placeholder="Say your name..."
        />
      </Form.Group>
      <Button
        onClick={buttonClickHandler}
        className="name-submit-button"
        variant="primary"
      >
        Save
      </Button>
    </Form>
  );
}

export default UserName;
