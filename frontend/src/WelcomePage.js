import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './WelcomePage.css'; // Import the CSS file

const WelcomePage = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Finance Management System</h1>
      <button className="welcome-btn" onClick={() => navigate('/dashboard')}>
        Finanace Manager
      </button>
      <button className="welcome-btn" onClick={() => navigate('/final-reports')}>
        Owner
      </button>
    </div>
  );
};

export default WelcomePage;
