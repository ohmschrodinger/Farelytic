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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="hamburger-menu">
        <div className="hamburger-icon" onClick={toggleMenu}>
          <div className="icon-1"></div>
          <div className="icon-2"></div>
          <div className="icon-3"></div>
        </div>
      </div>

      {/* Updated Farelytic Logo */}
      <div className="farelytic-logo">
        FARELYTIC
      </div>

      {/* Menu Overlay */}
      <nav className={isOpen ? "show" : ""}>
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