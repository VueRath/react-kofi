import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Replace with real logout logic
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>☕ Coffee Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <main className="dashboard-main">
        <div className="coffee-card">
          <h2>☕ Orders Today</h2>
          <p>23 drinks served</p>
        </div>
        <div className="coffee-card">
          <h2>📦 Inventory Status</h2>
          <p>Low on espresso beans</p>
        </div>
        <div className="coffee-card">
          <h2>👥 Customer Feedback</h2>
          <p>4.8 ⭐ average rating</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
