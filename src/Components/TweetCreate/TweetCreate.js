import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './TweetCreate.css';

function TweetCreate() {
  return (
    <Form className="new-tweet-form w-75 d-flex flex-column align-items-end">
      <Form.Control
        as="textarea"
        className="new-tweet-input flex-fill"
        placeholder="What you have in mind..."
      />
      <Button className="new-tweet-button">Tweet</Button>
    </Form>
  );
}

export default TweetCreate;
