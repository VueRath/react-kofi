// src/pages/Login.jsx
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import {useState} from 'react';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

  try {
    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response JSON:', JSON.stringify(data, null, 2));

    if(res.ok)
      {
        alert(data.message || 'Login Successful');
        navigate('/dashboard');
      } 
      else{
        setError(data.message || 'Login Failed');
      }
  }
  catch(err)
  {
    console.error(err);
    setError('Something went wrong...');
  }
}

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">☕ Coffee Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="login-label">Username</label>
            <input
              type="text"
              name='username'
              value={formData.username}
              onChange={handleChange}
              className="login-input"
              placeholder="username"
            />
          </div>

          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label className="login-label">Password</label>
            <input
              type="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              className="login-input"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

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
