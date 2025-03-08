import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/about" element={user ? <About user={user} onLogout={handleLogout} /> : <Navigate to="/signin" />} />
        <Route path="/services" element={user ? <Services user={user} onLogout={handleLogout} /> : <Navigate to="/signin" />} />
        <Route path="/contact" element={user ? <Contact user={user} onLogout={handleLogout} /> : <Navigate to="/signin" />} />
        <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;