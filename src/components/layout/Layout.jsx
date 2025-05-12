import React, { useState } from "react";
import Header from "../header/Header";
import Sidebar from "../slidebar/Sidebar";
import { Menu, X } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import LoadingFallback from "../LoadingFallback";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoading, loadingMessage } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen bg-red-50">
      {/* Header */}
      <div className="w-full border-b border-gray-200 fixed top-0 left-0 right-0 bg-white z-20">
        <Header />
      </div>

      <div className="flex flex-1 pt-16">
        {" "}
        {/* Add top padding to account for fixed header */}
        {/* Sidebar with dynamic width transition */}
        <div
          className={`
          fixed top-16 left-0 bottom-0
          transform transition-all duration-300 ease-in-out
          z-10
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
        >
          <Sidebar />
        </div>
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-10 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        {/* Main Content with dynamic margin */}
        <div className="flex-1 pl-0 lg:pl-64 p-4 md:p-6 transition-all duration-300">
          {isLoading ? (
            <main className="flex-grow flex items-center justify-center">
              <LoadingFallback message={loadingMessage} />
            </main>
          ) : (
            <main className="p-6 md:p-8">{children}</main>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg z-30"
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}

export default Layout;
