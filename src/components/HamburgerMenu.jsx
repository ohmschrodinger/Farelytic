import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const HamburgerMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close the menu after navigating
  };

  return (
    <>
      {/* Hamburger Button */}
      <div className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
        <div className={`icon-1 ${isOpen ? "a" : ""}`}></div>
        <div className={`icon-2 ${isOpen ? "c" : ""}`}></div>
        <div className={`icon-3 ${isOpen ? "b" : ""}`}></div>
      </div>

      {/* Menu Overlay */}
      <nav className={isOpen ? "show" : "no"}>
        <ul>
          <li onClick={() => handleNavigation("/")}>Home</li>
          <li onClick={() => handleNavigation("/about")}>About</li>
          <li onClick={() => handleNavigation("/services")}>Services</li>
          <li onClick={() => handleNavigation("/contact")}>Contact Us</li>
          <li className="logout-option" onClick={onLogout}>Logout</li>
        </ul>
      </nav>

      {/* Background Overlay */}
      <div className={`dark-blue ${isOpen ? "slide" : ""}`} />
    </>
  );
};

export default HamburgerMenu;