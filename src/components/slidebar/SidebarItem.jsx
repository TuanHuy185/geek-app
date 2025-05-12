import React from "react";

const SidebarItem = ({ icon: Icon, text, isHighlighted, link, onClick, showText }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center w-full px-3 py-2 
        ${isHighlighted ? 'bg-blue-50' : 'hover:bg-gray-50'}
        transition-colors duration-200
      `}
    >
      <Icon 
        className={`w-6 h-6 ${
          isHighlighted ? 'text-blue-500' : 'text-gray-500'
        }`} 
      />
      {showText && (
        <span className={`ml-3 ${
          isHighlighted ? 'text-blue-500' : 'text-gray-600'
        }`}>
          {text}
        </span>
      )}
    </button>
  );
};

export default SidebarItem;
