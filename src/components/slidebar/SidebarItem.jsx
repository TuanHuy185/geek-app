import React from "react";

const SidebarItem = ({ icon: Icon, text, isHighlighted, link, onClick, showText, isCollapsed }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full px-4 py-2.5
        ${isCollapsed ? 'justify-center' : 'justify-start'}
        ${isHighlighted 
          ? 'text-blue-600 bg-blue-50 font-medium' 
          : 'text-gray-600 hover:bg-gray-50'
        }
        transition-all duration-200
      `}
    >
      <Icon className={`flex-shrink-0 ${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'}`} />
      {showText && <span className="truncate">{text}</span>}
      {isCollapsed && (
        <span className="sr-only">{text}</span>
      )}
    </button>
  );
};

export default SidebarItem;
