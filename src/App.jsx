import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home"; // Updated import

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return <div>{user ? <Home user={user} /> : <SignIn />}</div>;
}

export default App;
