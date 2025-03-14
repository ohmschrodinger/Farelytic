// src/pages/Home.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";
import LocationSearch from "../components/LocationSearch";
import homeIcon from "../assets/home.svg";
import profileIcon from "../assets/profile.svg";
import "../index.css";
import Ham from "../components/Ham";

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
    // In the future, you would fetch ride prices here
    console.log("Searching for rides:", locations);
  };

  return (
    <div className="home-container">
      {/* Hamburger Menu */}
      <HamburgerMenu onLogout={handleLogout} />
      {/* <Ham /> */}
      <div>
        
      {/* Location Search */}
      
      {/* User Info - Moving this below the search */}
      <div className="user-info">
        <h3 className="welcome-text">Welcome, {user?.displayName || "User"}!</h3>
        {/* {user?.photoURL && <img src={user.photoURL} alt="Profile" className="profile-pic" />} */}
      </div>

      <LocationSearch onSearch={handleSearch} />
      {/* Ride Results would go here */}
      {searchParams && (
        <div className="search-status">
          <p>Searching for rides from {searchParams.pickup} to {searchParams.dropoff}...</p>
          {/* Future ride results will be displayed here */}
        </div>
      )}
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      {/* Footer Navbar */}
      {/* <footer className="footer-navbar">
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
      </footer> */}
    </div>
  );
};

export default Home;