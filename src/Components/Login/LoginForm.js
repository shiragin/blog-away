import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Google } from 'react-bootstrap-icons';
import './Login.css';

function LoginForm({
  email,
  password,
  setErrMsg,
  errMsg,
  setEmail,
  setPassword,
  onSignup,
  onLogin,
  onGoogle,
  logType,
  setLogType,
}) {
  return (
    <div className="login-container">
      <h1 className="login-title display-6">
        {logType === 'signup'
          ? 'Sign up for Blog Away!'
          : 'Log into your Blog Away!'}
      </h1>
      <Form className="login-form d-flex flex-column">
        <Form.Group className="">
          <Form.Label className="email-label">Email Address</Form.Label>
          <Form.Control
            className="email-input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrMsg('');
            }}
            required
            placeholder="Email Address"
          />
        </Form.Group>

        <Form.Group className="">
          <Form.Label className="password-label">Password</Form.Label>
          <Form.Control
            className="password-input"
            type="password"
            label="Create password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrMsg('');
            }}
            required
            placeholder="Password"
          />
        </Form.Group>

        <div className="login-links d-flex flex-column align-items-center">
          <div className="error-wrap">
            {errMsg && (
              <div variant="danger" className="text-alert error-msg">
                {errMsg}
              </div>
            )}
          </div>
          {logType === 'signup' ? (
            <Button
              className="login-submit-button"
              type="submit"
              onClick={onSignup}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              className="login-submit-button"
              type="submit"
              onClick={onLogin}
            >
              Log In
            </Button>
          )}

          <Button
            className="login-submit-button"
            type="submit"
            onClick={onGoogle}
          >
            <Google size={16} className="google" />{' '}
            {logType === 'signup' ? 'Sign up' : 'Log in'} with Google
          </Button>
          <div className="button-text">Already have an account?</div>
          {logType === 'signup' ? (
            <Button
              className="login-submit-button"
              onClick={() => setLogType('login')}
            >
              Log in
            </Button>
          ) : (
            <Button
              className="login-submit-button"
              onClick={() => setLogType('signup')}
            >
              Sign up
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
