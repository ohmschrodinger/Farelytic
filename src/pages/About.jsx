import React from "react";
import HamburgerMenu from "../components/HamburgerMenu";
import "../index.css";

const About = ({ user, onLogout }) => {
  return (
    <div className="home-container">
      {/* Hamburger Menu */}
      <HamburgerMenu onLogout={onLogout} />
      
      <h2 className="welcome-text">About Farelytic</h2>
      
      <div className="about-content">
        <p>
          Farelytic is your smart ride fare aggregator, designed to simplify the process of comparing ride-hailing fares across multiple platforms like Uber, Ola, and Rapido.
          We help users find the most cost-effective and fastest ride options in real-time, saving both time and money.
        </p>
        
        <h3>Why Choose Farelytic?</h3>
        <ul>
          <li>🔍 <strong>Real-Time Comparisons:</strong> Instantly fetches fare estimates and ETAs from different ride-hailing services.</li>
          <li>⚡ <strong>Fast & Efficient:</strong> Uses APIs and web scraping (Puppeteer) to provide up-to-date pricing.</li>
          <li>💰 <strong>Cost-Saving:</strong> Ensures you get the best ride option without manually switching between apps.</li>
          <li>🔄 <strong>Optimized Performance:</strong> Implements caching (Redis) to deliver quick responses.</li>
          <li>🎨 <strong>User-Friendly Interface:</strong> Built with React.js for seamless navigation and interaction.</li>
        </ul>

        <h3>Our Mission</h3>
        <p>
          We aim to enhance the ride-hailing experience by eliminating the hassle of manually checking different apps. Our system ensures that users make informed decisions by 
          presenting them with accurate and up-to-date ride fare details.
        </p>

        <h3>Get in Touch</h3>
        <p>
          Have questions or suggestions? Reach out to us and let’s improve your commuting experience together!
        </p>
      </div>
    </div>
  );
};

export default About;
