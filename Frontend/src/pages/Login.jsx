// src/pages/Login.jsx
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">☕ Coffee Login</h1>

        <form>
          <div className="form-group">
            <label className="login-label">Email</label>
            <input
              type="email"
              className="login-input"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label className="login-label">Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="login-button" style={{ marginTop: '2rem' }}>
            Login
          </button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
