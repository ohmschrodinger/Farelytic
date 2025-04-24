// src/pages/Profile.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import HamburgerMenu from "../components/HamburgerMenu";
import homeIcon from "../assets/home.svg";
import profileIcon from "../assets/profile.svg";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);
    
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName
      });
      setSuccessMessage("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      setError("Failed to update profile: " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="profile-container">
      {/* Hamburger Menu */}
      <HamburgerMenu onLogout={handleLogout} />
      
      {/* Header Navigation */}
      <header className="header-nav">
        <div className="nav-links">
          <a href="/" className="nav-link">
            <img src={homeIcon} alt="Home" />
            Home
          </a>
          <a href="/profile" className="nav-link active">
            <img src={profileIcon} alt="Profile" />
            Profile
          </a>
        </div>
        <div className="user-info">
          <p className="welcome-text">Welcome, {user?.displayName || "User"}!</p>
          {user?.photoURL && <img src={user.photoURL} alt="Profile" className="profile-pic" />}
        </div>
      </header>
      
      <h2 className="page-title">Your Profile</h2>
      
      <div className="profile-content">
        {user?.photoURL && (
          <div className="profile-pic-container">
            <img src={user.photoURL} alt="Profile" className="profile-pic-large" />
          </div>
        )}
        
        {!editing ? (
          <div className="profile-details">
            <h3>Name: {user?.displayName}</h3>
            <p>Email: {user?.email}</p>
            <p>Joined: {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Unknown"}</p>
            <button 
              className="edit-profile-btn" 
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form className="edit-profile-form" onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label htmlFor="displayName">Name:</label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={user?.email || ""}
                disabled
              />
              <small>Email cannot be changed</small>
            </div>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="form-buttons">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setEditing(false);
                  setDisplayName(user?.displayName || "");
                  setError(null);
                  setSuccessMessage(null);
                }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="save-btn"
                disabled={updating}
              >
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;