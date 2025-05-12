import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/style.module.css";
import "./index.css";
import { Provider } from 'react-redux';
import store, { persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AppProvider } from './context/AppContext';
import LoadingFallback from './components/LoadingFallback';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={<LoadingFallback message="Loading app state..." />} persistor={persistor}>
          <AppProvider>
            <App />
          </AppProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>,
  );
});
