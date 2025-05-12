import React from 'react';

const LoadingFallback = ({ message, size = 'medium' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-8 w-8 border-2';
      case 'large':
        return 'h-16 w-16 border-4';
      default: // medium
        return 'h-12 w-12 border-2';
    }
  };

  const sizeClasses = getSizeClasses();
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-50">
      <div className={`animate-spin rounded-full ${sizeClasses} border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent`}></div>
      {message && (
        <p className="mt-4 text-gray-600 text-center font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingFallback;
