import React from "react";
import { auth } from "../firebase";
import HamburgerMenu from "../components/HamburgerMenu";
import homeIcon from "../assets/home.svg";
import profileIcon from "../assets/profile.svg";
import "../index.css";

const Home = ({ user }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="home-container">
      {/* Hamburger Menu */}
      <HamburgerMenu onLogout={handleLogout} />
      
      {/* User Info */}
      <h2 className="welcome-text">Welcome, {user.displayName}!</h2>
      {user.photoURL && <img src={user.photoURL} alt="Profile" className="profile-pic" />}

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      {/* Footer Navbar */}
      <footer className="footer-navbar">
        <img src={homeIcon} alt="Home" className="nav-icon" />
        <img src={profileIcon} alt="Profile" className="nav-icon" />
      </footer>
    </div>
  );
};

export default Home;