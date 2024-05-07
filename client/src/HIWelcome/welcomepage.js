import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './WelcomePage.css'; // Import the CSS file

const WelcomePage = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  return (
    <div className="HI-welcome-container">
      <h1 className="HI-welcome-title">Welcome to Pickup and Delivery Management System</h1>
      <button className="HI-welcome-btn" onClick={() => navigate('/HIDashboard')}>
        Harvest & Inventory Manager
      </button>
      <button className="HI-welcome-btn" onClick={() => navigate('/DashboardHISupervisor')}>
        Supervisor
      </button>
      <button className="HI-welcome-btn" onClick={() => navigate('/DifferenceQuantity')}>
        Pickup & Delivery Maanager
      </button>
      <button className="HI-welcome-btn" onClick={() => navigate('/DifferenceQuantity')}>
        Buyer & Sales Manager
      </button>
      
    </div>
  );
};

export default WelcomePage;
