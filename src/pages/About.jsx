import React from "react";
import HamburgerMenu from "../components/HamburgerMenu";
import "../index.css";

const About = ({ user, onLogout }) => {
  return (
    <div className="home-container">
      {/* Hamburger Menu */}
      <HamburgerMenu onLogout={onLogout} />
      
      <h2 className="welcome-text">About Us</h2>
      
      <div className="about-content">
        <p>This is the about page of our application. Here you can learn more about what we do.</p>
        <p>Feel free to explore our services and get in touch if you have any questions.</p>
      </div>
    </div>
  );
};

export default About;