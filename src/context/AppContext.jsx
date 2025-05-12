import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [skipLoading, setSkipLoading] = useState(false);

  const startLoading = (message = '') => {
    if (!skipLoading) {
      setLoadingMessage(message);
      setIsLoading(true);
    }
  };

  const stopLoading = () => {
    setIsLoading(false);
    setLoadingMessage('');
  };

  const toggleSkipLoading = (value) => {
    setSkipLoading(value !== undefined ? value : !skipLoading);
  };

  return (
    <AppContext.Provider value={{
      isLoading,
      loadingMessage,
      startLoading,
      stopLoading,
      skipLoading,
      toggleSkipLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
