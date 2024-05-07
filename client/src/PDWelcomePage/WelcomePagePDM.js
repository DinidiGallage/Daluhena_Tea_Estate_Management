import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './WelcomePagePDM.css'; // Import the CSS file

const WelcomePagePD = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Pickup and Delivery Management System</h1>
      <button className="welcome-btn" onClick={() => navigate('/DashboardPage')}>
        Pickup & Delivery Manager
      </button>
      <button className="welcome-btn" onClick={() => navigate('/DashboardPageFM')}>
        Factory Manager
      </button>
      <button className="welcome-btn" onClick={() => navigate('/Dashboard')}>
        Resource Manager
      </button>
      <button className="welcome-btn" onClick={() => navigate('/MonthlyDeliveries')}>
        Pickup & Intentory Manager
      </button>
      <button className="welcome-btn" onClick={() => navigate('/MonthlyDeliveries')}>
        Buyer & Sales Manager
      </button>
      <button className="welcome-btn" onClick={() => navigate('/Home')}>
        Home
      </button>
    </div>
  );
};

export default WelcomePagePD;
