import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SidebarItem from "./SidebarItem";

// Import icons for sidebar items
import albumsIcon from "../../assets/albums.png";
import usersIcon from "../../assets/users.png";

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [highlightedMainItem, setHighlightedMainItem] = useState(null);
  const [highlightedSubItem, setHighlightedSubItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);

  const items = [
    {
      icon: albumsIcon,
      text: "Albums",
      link: "/albums",
    },
    {
      icon: usersIcon,
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

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (index, itemLink) => {
    if (!itemLink) return;

    setIsLoading(true);
    setTimeout(() => {
      setHighlightedMainItem(index);
      setHighlightedSubItem(itemLink);
      navigate(itemLink);
      setIsLoading(false);
    }, 500);
  };

  return (
    <aside className={`h-full ${isCollapsed ? "w-[90px]" : "w-[220px]"} bg-white`}>
      <div className={`
        flex flex-col grow items-center 
        px-1 pt-3.5 
        text-sm leading-snug text-black 
        bg-white border-r border-gray-200
        h-full
      `}>
        <nav
          className={`flex flex-col self-stretch w-full ${
            isLoading ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              isHighlighted={highlightedMainItem === index}
              link={item.link}
              onClick={() => handleItemClick(index, item.link)}
              showText={!isCollapsed}
              subItems={item.subItems}
              currentPath={highlightedSubItem}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
