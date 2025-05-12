import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";
import LoadingFallback from "./components/LoadingFallback";
import UserList from "./app/user/UserList";
import UserDetail from "./app/user/UserDetail";
import AlbumList from "./app/Album/AlbumList";
import AlbumDetail from "./app/Album/AlbumDetail";
import { AppProvider } from './context/AppContext';

// Add custom hook for managing document title
export const useDocumentTitle = (title) => {
  React.useEffect(() => {
    document.title = `${title} | Refine`;
  }, [title]);
};

export default function App() {
  return (
    <AppProvider>
      <Router>
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
            
            {/* Album routes - Sửa lại thứ tự và loại bỏ route redirect trùng lặp */}
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
      </Router>
    </AppProvider>
  );
}