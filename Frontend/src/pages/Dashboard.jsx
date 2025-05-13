import { useEffect, useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/coffees')
      .then(res => res.json())
      .then(data => setCoffees(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>☕ Coffee Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <div className="summary-card">
          <h2>☕ Orders Today</h2>
          <p>23 drinks served</p>
        </div>
        <div className="summary-card">
          <h2>📦 Inventory Status</h2>
          <p>Low on espresso beans</p>
        </div>
        <div className="summary-card">
          <h2>👥 Customer Feedback</h2>
          <p>4.8 ⭐ average rating</p>
        </div>
      </main>

      <h2 className="section-title">🛍️ Available Coffees</h2>
      <div className="coffee-grid">
        {coffees.map(coffee => (
          <div className="coffee-card-item" key={coffee.id}>
            <img src={coffee.image} alt={coffee.name} className="coffee-image" />
            <div className="coffee-details">
              <h3 className="coffee-name">{coffee.name}</h3>
              <p className="coffee-description">{coffee.description}</p>
              <p className="coffee-price">${parseFloat(coffee.price).toFixed(2)}</p>
              <button className="buy-button">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
