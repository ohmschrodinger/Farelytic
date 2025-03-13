import React from "react";
import HamburgerMenu from "../components/HamburgerMenu";
import "../index.css";

const Contact = ({ user, onLogout }) => {
  return (
    <div className="home-container">
      {/* Hamburger Menu */}
      <HamburgerMenu onLogout={onLogout} />
      
      <h2 className="welcome-text">Contact Farelytic</h2>
      
      <div className="contact-content">
        <p>Have any questions or feedback? We'd love to hear from you! Reach out to us through the following channels:</p>
        
        <h3>Contact Information</h3>
        <p>📧 <strong>Email:</strong> support@farelytic.com</p>
        <p>📞 <strong>Phone:</strong> +1 (234) 567-8901</p>
        <p>📍 <strong>Address:</strong> 123 Innovation Drive, Tech City</p>

        <h3>Follow Us</h3>
        <p>🌐 <strong>Website:</strong> www.farelytic.com</p>
        <p>🐦 <strong>Twitter:</strong> @Farelytic</p>
        <p>📘 <strong>Facebook:</strong> Farelytic</p>
        <p>📷 <strong>Instagram:</strong> @FarelyticApp</p>

        <h3>Send Us a Message</h3>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
