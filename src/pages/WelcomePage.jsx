import React from "react";
import { auth } from "../firebase";
import "../index.css";

const WelcomePage = ({ user }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="welcome-container">
      <h2 className="welcome-text">Welcome, {user.displayName}!</h2>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default WelcomePage;
