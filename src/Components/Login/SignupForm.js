import { NavLink, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';

function SignupForm({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  onGoogle,
}) {
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <h1 className="login-title display-6">Sign up for Blog Away!</h1>
      <Form className="login-form">
        <Form.Group className="login-group d-flex gap-3 align-items-center justify-content-between">
          <Form.Label className="email-label">Email Address</Form.Label>
          <Form.Control
            className="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
          />
        </Form.Group>

        <Form.Group className="login-group d-flex gap-3 align-items-center justify-content-between">
          <Form.Label className="password-label">Password</Form.Label>
          <Form.Control
            className="password-input"
            type="password"
            label="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </Form.Group>
        <div className="login-links">
          <div className="d-flex justify-content-between">
            <Button
              className="login-submit-button"
              type="submit"
              onClick={onSubmit}
            >
              Sign up
            </Button>
            <Button
              className="login-submit-button"
              onClick={() => navigate('/login')}
            >
              Log in
            </Button>
          </div>
          <div className="sign-google d-flex flex-column justify-content-center align-items-center">
            <div>Or</div>
            <Button
              className="login-submit-button"
              type="submit"
              onClick={onGoogle}
            >
              Sign up with Google
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default SignupForm;

{
  /* <div className="login-links">
<div className="d-flex justify-content-between">
  <Form.Label className="email-label">Already signed up?</Form.Label>
  <div className="buttons-wrapper d-flex gap-1 justify-content-between">
    <Button
      className="login-submit-button"
      onClick={() => navigate('/login')}
    >
      Log in
    </Button>
    <Button
      className="login-submit-button"
      type="submit"
      onClick={onSubmit}
    >
      Sign up
    </Button>
  </div>
</div>
<div className="sign-google d-flex flex-column justify-content-center align-items-center">
  <div>Or</div>
  <Button
    className="login-submit-button"
    type="submit"
    onClick={onGoogle}
  >
    Sign up with Google
  </Button>
</div>
</div> */
}
