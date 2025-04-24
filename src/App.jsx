// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mongoData, setMongoData] = useState([]);

  // Handling Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Fetching Data from MongoDB
  useEffect(() => {
    if (user) {
      fetch("http://localhost:5000/api/data")
        .then((response) => response.json())
        .then((data) => setMongoData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [user]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" />} />
          <Route path="/about" element={user ? <About user={user} onLogout={handleLogout} mongoData={mongoData} /> : <Navigate to="/signin" />} />
          <Route path="/services" element={user ? <Services user={user} onLogout={handleLogout} /> : <Navigate to="/signin" />} />
          <Route path="/contact" element={user ? <Contact user={user} onLogout={handleLogout} /> : <Navigate to="/signin" />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/signin" />} />
          <Route path="/" element={user ? <Home user={user} mongoData={mongoData} /> : <Navigate to="/signin" />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
