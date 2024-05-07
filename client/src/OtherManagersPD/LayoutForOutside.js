import React from 'react';
import Header from './header';

const LayoutForOutside = ({ children }) => (
  <div style={{ display: 'flex', height: '100vh' }}>
    <Header /> {/* This will render your Header component */}
    <div style={{ flex: 1 }}>{children}</div> {/* Children content will render here */}
  </div>
);

export default LayoutForOutside;
