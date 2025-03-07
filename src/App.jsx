import React, { useState, useEffect } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import SignIn from "./pages/SignIn";
import WelcomePage from "./pages/WelcomePage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return <div>{user ? <WelcomePage user={user} /> : <SignIn />}</div>;
}

export default App;
