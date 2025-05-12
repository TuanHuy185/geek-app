import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/style.module.css";
import "./index.css";
import { AppProvider } from './context/AppContext';

// Wait for i18n to be initialized
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AppProvider>
          <App />
      </AppProvider>
    </React.StrictMode>,
  );
});
