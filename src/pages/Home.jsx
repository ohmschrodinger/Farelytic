// src/pages/Home.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";
import LocationSearch from "../components/LocationSearch";
import homeIcon from "../assets/home.svg";
import profileIcon from "../assets/profile.svg";
import "../index.css";

const Home = ({ user, mongoData }) => {
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
    console.log("Searching for rides:", locations);
    if (locations.pickup.lat && locations.pickup.lng && 
        locations.dropoff.lat && locations.dropoff.lng) {
      console.log("Pickup coordinates:", locations.pickup.lat, locations.pickup.lng);
      console.log("Dropoff coordinates:", locations.dropoff.lat, locations.dropoff.lng);
    }
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

      {/* MongoDB Data Section */}
      <div className="mongo-data">
        <h3>MongoDB Data:</h3>
        <ul>
          {mongoData.length > 0 ? (
            mongoData.map((item) => (
              <li key={item._id}>
                {item.name} - {item.age} years old
              </li>
            ))
          ) : (
            <p>No data found.</p>
          )}
        </ul>
      </div>

      {/* Ride Results */}
      {searchParams && (
        <div className="search-status">
          <p>Searching for rides from {searchParams.pickup.name} to {searchParams.dropoff.name}...</p>
          {searchParams.pickup.lat && searchParams.pickup.lng && 
           searchParams.dropoff.lat && searchParams.dropoff.lng && (
            <p className="coordinates-info">
              Distance: {calculateDistance(
                searchParams.pickup.lat,
                searchParams.pickup.lng,
                searchParams.dropoff.lat, 
                searchParams.dropoff.lng
              ).toFixed(2)} km
            </p>
          )}
        </div>
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

// Helper function to calculate distance between coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

export default Home;
