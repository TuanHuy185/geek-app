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
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`animate-spin rounded-full ${sizeClasses} border-t-themecolor1 border-b-themecolor3 border-l-transparent border-r-transparent`}></div>
      {message && (
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-center">{message}</p>
      )}
    </div>
  );
};

export default LoadingFallback;
