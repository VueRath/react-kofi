// src/pages/Register.jsx
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">☕ Create an Account</h1>

        <form>
          <label className="register-label">Name</label>
          <input
            type="text"
            className="register-input"
            placeholder="John Doe"
          />

          <label className="register-label">Email</label>
          <input
            type="email"
            className="register-input"
            placeholder="you@example.com"
          />

          <label className="register-label">Password</label>
          <input
            type="password"
            className="register-input"
            placeholder="••••••••"
          />

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
