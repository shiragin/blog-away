import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UserName.css';

function UserName() {
  return (
    <Form className="name-form w-75 d-flex flex-column">
      <h1 className="name-title display-6">Profile</h1>
      <Form.Group>
        <Form.Label className="name-label">User Name</Form.Label>
        <Form.Control
          className="name-input"
          type="text"
          placeholder="Say your name..."
        />
      </Form.Group>
      <Button className="name-submit-button" variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
}

export default UserName;
