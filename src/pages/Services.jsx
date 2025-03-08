import React from "react";
import HamburgerMenu from "../components/HamburgerMenu";
import "../index.css";

const Services = ({ user, onLogout }) => {
  return (
    <div className="home-container">
      {/* Hamburger Menu */}
      <HamburgerMenu onLogout={onLogout} />
      
      <h2 className="welcome-text">Our Services</h2>
      
      <div className="services-content">
        <p>Here you can find all the services we offer:</p>
        <ul className="services-list">
          <li>Service 1</li>
          <li>Service 2</li>
          <li>Service 3</li>
          <li>Service 4</li>
        </ul>
      </div>
    </div>
  );
};

export default Services;