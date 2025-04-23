// src/pages/Home.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";
import LocationSearch from "../components/LocationSearch";
import RideOptions from "../components/RideOptions";
import homeIcon from "../assets/home.svg";
import profileIcon from "../assets/profile.svg";
import "../index.css";

const Home = ({ user }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState(null);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSearch = (locations) => {
    setSearchParams(locations);
  };

  return (
    <div className="home-container">
      {/* Hamburger Menu */}
      <HamburgerMenu onLogout={handleLogout} />
      
      {/* Location Search */}
      <LocationSearch onSearch={handleSearch} />
      
      {/* User Info */}
      <div className="user-info">
        <h3 className="welcome-text">Welcome, {user?.displayName || "User"}!</h3>
        {user?.photoURL && <img src={user.photoURL} alt="Profile" className="profile-pic" />}
      </div>

      {/* Ride Options */}
      {searchParams && (
        <RideOptions 
          source={searchParams.pickup.name} 
          destination={searchParams.dropoff.name} 
        />
      )}

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      {/* Footer Navbar */}
      <footer className="footer-navbar">
        <img 
          src={homeIcon} 
          alt="Home" 
          className="nav-icon active" 
        />
        <img 
          src={profileIcon} 
          alt="Profile" 
          className="nav-icon" 
          onClick={() => navigate('/profile')}
        />
      </footer>
    </div>
  );
};

export default Home;