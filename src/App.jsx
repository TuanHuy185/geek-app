import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";
import LoadingFallback from "./components/LoadingFallback";
import UserList from "./app/User/UserList";
import UserDetail from "./app/User/UserDetail";
import AlbumList from "./app/Album/AlbumList";
import AlbumDetail from "./app/Album/AlbumDetail";
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';

export const useDocumentTitle = (title) => {
  React.useEffect(() => {
    document.title = `${title} | Refine`;
  }, [title]);
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Default route */}
              <Route 
                path="/" 
                element={<Navigate to="/albums?pageSize=20&current=1" replace />} 
              />
              
              {/* User routes */}
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<UserDetail />} />
              
              {/* Album routes */}
              <Route path="/albums" element={<AlbumList />} />
              <Route path="/albums/:id" element={<AlbumDetail />} />
              
              {/* Catch all */}
              <Route 
                path="*" 
                element={<Navigate to="/albums?pageSize=20&current=1" replace />} 
              />
            </Routes>
          </Suspense>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            theme="colored"
            className="toast-container"
          />
        </ErrorBoundary>
      </Router>
    </AppProvider>
  );
}