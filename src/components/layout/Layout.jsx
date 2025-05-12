import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import Sidebar from "../slidebar/Sidebar";
import { Menu, X } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import LoadingFallback from "../LoadingFallback";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const { isLoading, loadingMessage } = useAppContext();

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-100">
      {/* Header */}
      <div className="w-full h-16 border-b border-gray-200 fixed top-0 left-0 right-0 bg-white z-20">
        <Header />
      </div>

      <div className="flex flex-1">
        {/* Sidebar - Adjusted top position to match header height */}
        <div
          className={`
          fixed top-[64px] left-0 bottom-0
          transform transition-all duration-300 ease-in-out
          z-10
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
        >
          <Sidebar isCollapsed={isCollapsed} onCollapse={setIsCollapsed} />
        </div>
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-10 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        {/* Main Content with dynamic margin */}
        <div
          className={`
          flex-1 transition-all duration-300 pt-24
          ${!isCollapsed ? 'lg:pl-[200px]' : 'lg:pl-[90px]'}
        `}
        >
          {isLoading ? (
            <main className="flex-grow flex items-center justify-center">
              <LoadingFallback message={loadingMessage} />
            </main>
          ) : (
            <main>{children}</main>
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
