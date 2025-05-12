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
import UserList from "./app/User/UserList";
import UserDetail from "./app/User/UserDetail";
import AlbumList from "./app/Album/AlbumList";
import AlbumDetail from "./app/Album/AlbumDetail";

export default function App() {
  return (
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Default route */}
            <Route path="/" element={<Navigate to="/albums" />} />
            
            {/* User routes */}
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
            
            {/* Album routes */}
            <Route path="/albums" element={<AlbumList />} />
            <Route path="/albums/:id" element={<AlbumDetail />} />
            
            {/* Catch all - redirect to users */}
            <Route path="*" element={<Navigate to="/albums" />} />
          </Routes>
        </Suspense>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          theme="colored"
          className="toast-container"
        />
      </Router>
  );
}