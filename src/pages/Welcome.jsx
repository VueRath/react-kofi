import { Link } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  return (
    <div className="welcome-container">
      <h1 className="welcome-heading">☕ Welcome to Kofi Hub!</h1>

      <p className="welcome-subtext">
        A cozy dashboard for your coffee shop
      </p>

      <div className="welcome-buttons">
        <Link to="/login" className="welcome-button login-button">
          Log In
        </Link>
        <Link to="/register" className="welcome-button register-button">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
