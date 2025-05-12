import React from "react";
import { Link } from "react-router-dom";
import geekuplogo from "../../assets/geekup-logo.png";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm py-5 px-6">
      <div className="max-w-7xl">
        <div className="flex items-center">
          <Link to="/albums">
            <img src={geekuplogo} alt="GeekUp" className="h-7 w-auto" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
