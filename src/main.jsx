import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/style.module.css";
import "./index.css";
import { Provider } from 'react-redux';
import store from './store/store';
import { AppProvider } from './context/AppContext';

// Wait for i18n to be initialized
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <AppProvider>
          <App />
        </AppProvider>
      </Provider>
    </React.StrictMode>,
  );
});
