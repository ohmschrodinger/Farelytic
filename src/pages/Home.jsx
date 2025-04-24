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

  const handleBackToSearch = () => {
    setSearchParams(null);
  };

  return (
    <div className="home-container">
      {/* Hamburger Menu */}
      <HamburgerMenu onLogout={handleLogout} />
      
      {/* Header Navigation */}
      <header className="header-nav">
        <div className="nav-links">
          <a href="/" className="nav-link active">
            <img src={homeIcon} alt="Home" />
            Home
          </a>
          <a href="/profile" className="nav-link">
            <img src={profileIcon} alt="Profile" />
            Profile
          </a>
        </div>
        <div className="user-info">
          <p className="welcome-text">Welcome, {user?.displayName || "User"}!</p>
          {user?.photoURL && <img src={user.photoURL} alt="Profile" className="profile-pic" />}
        </div>
      </header>
      
      {/* Conditional Rendering based on search state */}
      {!searchParams ? (
        // Show search section when no search params
        <div className="search-wrapper">
          <div>
            <LocationSearch onSearch={handleSearch} />
          </div>
        </div>
      ) : (
        // Show ride options when search params exist
        <div className="ride-options-wrapper">
          <RideOptions 
            source={searchParams.pickup.name} 
            destination={searchParams.dropoff.name} 
          />
          <button 
            className="back-to-search-btn" 
            onClick={handleBackToSearch}
          >
            New Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;