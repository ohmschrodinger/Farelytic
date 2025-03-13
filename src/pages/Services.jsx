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
        <p>Farelytic offers a range of services designed to make ride fare comparison simple, fast, and efficient.</p>
        
        <h3>What We Offer</h3>
        <ul className="services-list">
          <li><strong>🚖 Real-Time Fare Comparison:</strong> Instantly compare ride fares from Uber, Ola, Rapido, and more.</li>
          <li><strong>⏳ Estimated Time of Arrival (ETA) Tracking:</strong> View and compare arrival times to choose the fastest option.</li>
          <li><strong>🔄 Hybrid Data Fetching:</strong> Uses APIs where available and web scraping for missing data to ensure accuracy.</li>
          <li><strong>⚡ Performance Optimization:</strong> Implements caching (Redis) for faster results and reduced load times.</li>
          <li><strong>📊 Fare Trend Analysis:</strong> Tracks past fare trends to help users predict pricing fluctuations.</li>
          <li><strong>📍 Location-Based Suggestions:</strong> Provides recommendations based on your current location and ride history.</li>
          <li><strong>🎨 User-Friendly Interface:</strong> Clean and intuitive UI built with React.js for a seamless experience.</li>
        </ul>

        <h3>Why Choose Farelytic?</h3>
        <p>With Farelytic, you never have to waste time switching between ride-hailing apps. Our system ensures you get the best ride at the best price, saving both time and money.</p>

        <h3>Get Started Today!</h3>
        <p>Compare fares now and make your ride-hailing experience smarter and more convenient.</p>
      </div>
    </div>
  );
};

export default Services;
