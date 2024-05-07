// FactoryContext.js
import React, { createContext, useState, useContext } from 'react';

const FactoryContext = createContext();

export const useFactory = () => useContext(FactoryContext);

export const FactoryProvider = ({ children }) => {
  const [factoryName, setFactoryName] = useState('');

  return (
    <FactoryContext.Provider value={{ factoryName, setFactoryName }}>
      {children}
    </FactoryContext.Provider>
  );
};
