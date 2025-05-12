import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { TiDocumentText } from "react-icons/ti";
import { LiaAddressCard } from "react-icons/lia";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Sidebar = ({ isCollapsed, onCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [highlightedMainItem, setHighlightedMainItem] = useState(null);
  const [highlightedSubItem, setHighlightedSubItem] = useState(null);

  const items = [
    {
      icon: TiDocumentText,
      text: "Albums",
      link: "/albums",
    },
    {
      icon: LiaAddressCard ,
      text: "Users",
      link: "/users",
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const mainItem = items.find((item) => currentPath.startsWith(item.link));

    if (mainItem) {
      const mainIndex = items.indexOf(mainItem);
      setHighlightedMainItem(mainIndex);
      setHighlightedSubItem(currentPath);
    }
  }, [location.pathname, items]);

  const handleItemClick = (index, itemLink) => {
    if (!itemLink) return;
    
    // Just update highlights and navigate, don't change collapse state
    setHighlightedMainItem(index);
    setHighlightedSubItem(itemLink);
    
    // Navigate without affecting sidebar collapse state
    if (itemLink === '/albums') {
      navigate('/albums?pageSize=20&current=1', { replace: true });
    } else {
      navigate(itemLink, { replace: true });
    }
  };

  const handleCollapseToggle = () => {
    onCollapse(!isCollapsed);
  };

  return (
    <aside className={`h-full ${isCollapsed ? "w-[80px]" : "w-[200px]"} bg-white transition-all duration-300`}>
      <div className="flex flex-col h-full bg-white border-r border-gray-200">
        <nav className={`flex flex-col flex-1 py-4`}>
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              isHighlighted={highlightedMainItem === index}
              link={item.link}
              onClick={() => handleItemClick(index, item.link)}
              showText={!isCollapsed}
              isCollapsed={isCollapsed}
              currentPath={highlightedSubItem}
            />
          ))}
        </nav>

        <button
          onClick={handleCollapseToggle}
          className="mb-2 mx-auto p-2 hover:bg-blue-50 rounded-full text-blue-400 hover:text-blue-700 transition-colors"
        >
          {isCollapsed ? (
            <HiChevronRight className="w-5 h-5" />
          ) : (
            <HiChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
