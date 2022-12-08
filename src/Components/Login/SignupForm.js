import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';

function SignupForm({ email, setEmail, password, setPassword, onSubmit }) {
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
        <div className="login-links d-flex justify-content-between align-items-center">
          <div className="login-link w-50">
            Already have an account? <NavLink to="/login">Log in</NavLink>
          </div>
          <Button
            className="login-submit-button"
            type="submit"
            onClick={onSubmit}
          >
            Sign up
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SignupForm;
