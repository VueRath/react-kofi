import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import {useState} from 'react';

const Register = () => {
  const navigate = useNavigate();

  const[formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [err, setError] = useState(null);
  
  const handleChange = e => 
    {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async e => {
      e.preventDefault();
      
      try {
        const res = await fetch('http://localhost:3001/register-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          })
        });

        const data = await res.json();

        if(res.ok)
          {
            alert(data.message || 'Registered Successfully!');
            navigate('/login');
          }
          else {
            if (data.errors) {
              const messages = data.errors.map(e => e.msg).join(', ');
              setError(messages);
            } else {
              setError(data.message || 'Registration Failed');
            }
          }
      }
      catch(err){
        console.error(err);
        setError('Something went wrong...');
      }
    }
  
  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">☕ Create an Account</h1>

        <form onSubmit={handleSubmit}>
          <label className="register-label">Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="register-input"
            placeholder="John Doe"
          />

          <label className="register-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
            placeholder="you@example.com"
          />

          <label className="register-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
            placeholder="••••••••"
          />

          {err && <p className="error-message">{err}</p>}

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
