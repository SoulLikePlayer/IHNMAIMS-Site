import React, { createContext, useState, useContext } from 'react';

const SecretContext = createContext();

export const SecretProvider = ({ children }) => {
  const [secrets, setSecrets] = useState(() => {
    const storedSecrets = sessionStorage.getItem('secrets');
    return storedSecrets ? JSON.parse(storedSecrets) : {};
  });

  const setSecret = (key, value, description, title) => {
    setSecrets(prevSecrets => {
      const newSecrets = { 
        ...prevSecrets, 
        [key]: { value, description, title } 
      };
      sessionStorage.setItem('secrets', JSON.stringify(newSecrets));
      return newSecrets;
    });
  };

  const getSecret = (key) => {
    return secrets[key];
  };

  return (
    <SecretContext.Provider value={{ secrets, setSecret, getSecret }}>
      {children}
    </SecretContext.Provider>
  );
};

export const useSecret = () => {
  const context = useContext(SecretContext);
  if (!context) {
    throw new Error('useSecret must be used within a SecretProvider');
  }
  return context;
};
