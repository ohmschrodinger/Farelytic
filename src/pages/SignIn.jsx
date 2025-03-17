import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "../index.css";
import welcomeImage from "../assets/welcome.svg";

const SignIn = () => {
  // const signInWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     console.log("User signed in:", result.user);
  //   } catch (error) {
  //     console.error("Error signing in:", error);
  //   }

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      await fetch('http://localhost:5000/api/auth/google-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        })
      });
  
      console.log("User signed in and saved to DB:", user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  
  
  };

 
  

  return (
    <div className="welcome-container">
      <img src={welcomeImage} alt="Welcome" className="welcome-image" />
      <h2 className="welcome-text">Welcome, <br /> have a better sharing experience</h2>
      <button className="google-signin-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;

