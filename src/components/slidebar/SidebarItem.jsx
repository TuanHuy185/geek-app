import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SidebarItem({ icon, text, isHighlighted, link, onClick, showText, subItems, currentPath }) {
  const navigate = useNavigate();

  const handleMainClick = (e) => {
    if (subItems?.length) {
      e.preventDefault();
      navigate(link);
    } else {
      navigate(link);
    }
  };

  const handleSubItemClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(e.target.getAttribute('href'));
  };

  return (
    <>
      <div
        className={`
          flex items-center gap-3 px-4 py-3 cursor-pointer
          ${isHighlighted 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-black'
          }
          hover:bg-gray-100
        `}
        onClick={handleMainClick}
      >
        <img 
          src={icon} 
          alt={text} 
          className={`w-6 h-6 ${
            isHighlighted 
              ? 'brightness-0 saturate-100 invert-[.35] sepia-[.6] hue-rotate-[170deg]' 
              : 'brightness-0'
          }`} 
        />
        {showText && <span>{text}</span>}
      </div>

      {showText && subItems?.length > 0 && (
        <div className="ml-8">
          {subItems.map((subItem, index) => (
            <Link
              key={index}
              to={subItem.link}
              onClick={handleSubItemClick}
              className={`block py-2 px-4 rounded-lg mt-1 text-sm ${
                currentPath === subItem.link
                  ? 'text-white bg-themecolor3 border-l-2 border-themecolor1'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              {subItem.text}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default SidebarItem;
