import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './WelcomePageMR.css'; // Import the CSS file

const WelcomePageMR = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Weather Forecast and Cultivation Management System</h1>
      <button className="welcome-btn" onClick={() => navigate('/MRManager')}>
        Maintenece and Repair Manager
      </button>
      <button className="welcome-btn" onClick={() => navigate('/Technician')}>
        Technican Manager
      </button>
      <button className="welcome-btn" onClick={() => navigate('/MREmployee')}>
        Employee
      </button>
      <button className="welcome-btn" onClick={() => navigate('/Home')}>
      Home
      </button>
    </div>
  );
};

export default WelcomePageMR;
