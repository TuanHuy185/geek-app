import React, { createContext, useContext, useState, useRef } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const loadingTimeoutRef = useRef(null);

  const startLoading = (message = '') => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(true);
      setLoadingMessage(message);
    }, 1000); 
  };

  const stopLoading = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    setIsLoading(false);
    setLoadingMessage('');
  };

  return (
    <AppContext.Provider value={{ isLoading, loadingMessage, startLoading, stopLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
