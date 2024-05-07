import React from 'react';
import Header from './header';

const Employee = ({ children }) => (
  <div style={{ display: 'flex', height: '100vh' }}> {/* Full screen height and flex container */}
    <div style={{
      minWidth: '250px', // Adjust the width as needed
      height: '100vh', // Full screen height
      backgroundColor: '#f8f9fa', // Example background color
      overflowY: 'auto' // Adds scroll to the nav if content overflows
    }}>
      <Header /> {/* Render the navigation bar */}
    </div>
    <div style={{ flex: 1, overflowY: 'auto' }}> {/* Content area */}
      {children} {/* Render the specific page content */}
    </div>
  </div>
);

export default Employee;
