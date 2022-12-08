import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';

function LoginForm({ email, setEmail, password, setPassword, onLogin }) {
  return (
    <div className="login-container">
      <h1 className="login-title display-6">Log into your Blog Away!</h1>
      <Form className="login-form">
        <Form.Group className="login-group d-flex gap-3 align-items-center justify-content-between">
          <Form.Label className="email-label">Email address</Form.Label>
          <Form.Control
            className="email-input"
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="login-group d-flex gap-3 align-items-center justify-content-between">
          <Form.Label className="email-label">Password</Form.Label>
          <Form.Control
            className="password-input"
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="login-links d-flex justify-content-between align-items-center">
          <div className="login-link w-50">
            No account yet? <NavLink to="/">Sign up</NavLink>
          </div>
          <Button className="login-submit-button" onClick={onLogin}>
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
