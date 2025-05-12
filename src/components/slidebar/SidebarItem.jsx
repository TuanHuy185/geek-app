import React from "react";

const SidebarItem = ({ icon: Icon, text, isHighlighted, link, onClick, showText, isCollapsed }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <div className="px-1.5 py-0.5">
      <button
        onClick={handleClick}
        className={`
          flex items-center gap-2 w-full px-4 py-2.5 rounded-xl
          ${isCollapsed ? 'justify-center' : 'justify-start'}
          ${isHighlighted 
            ? 'text-blue-500 bg-sky-100' 
            : 'text-gray-500 hover:bg-gray-100'
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
    </div>
  );
};

export default SidebarItem;
