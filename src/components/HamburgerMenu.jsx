import React, { useState } from "react";
import menuIcon from "../assets/menu.svg"; // Your custom hamburger icon
import "../index.css"; // Make sure styles are properly linked

const HamburgerMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <div className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
        <div className={`icon-1 ${isOpen ? "a" : ""}`}></div>
        <div className={`icon-2 ${isOpen ? "c" : ""}`}></div>
        <div className={`icon-3 ${isOpen ? "b" : ""}`}></div>
      </div>

      {/* Menu Overlay */}
      <nav className={isOpen ? "show" : ""}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Help And Support</li>
          <li className="logout-option" onClick={onLogout}>Logout</li>
        </ul>
      </nav>

      {/* Background Overlay */}
      <div className={`dark-blue ${isOpen ? "slide" : ""}`} />
    </>
  );
};

export default HamburgerMenu;
