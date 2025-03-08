import React from "react";
import HamburgerMenu from "../components/HamburgerMenu";
import "../index.css";

const Contact = ({ user, onLogout }) => {
  return (
    <div className="home-container">
      {/* Hamburger Menu */}
      <HamburgerMenu onLogout={onLogout} />
      
      <h2 className="welcome-text">Contact Us</h2>
      
      <div className="contact-content">
        <p>Feel free to reach out to us:</p>
        <p>Email: example@example.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 React Street, Web App City</p>
      </div>
    </div>
  );
};

export default Contact;