import React from "react";
import { Link } from "react-router-dom";
import geekuplogo from "../../assets/geekup-logo.png";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm py-5 px-4">
      <div className="max-w-7xl">
        <div className="flex items-center">
          <Link to="/albums?pageSize=20&current=1">
            <img src={geekuplogo} alt="GeekUp" className="h-7 w-auto" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
