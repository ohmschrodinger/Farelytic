const User = require('../models/User'); // Make sure this path matches your file structure case

const handleGoogleSignIn = async (userData) => {
  const { uid, displayName, email, photoURL } = userData;

  try {
    console.log("User Data Received:", userData);

    let user = await User.findOne({ googleId: uid });

    if (!user) {
      console.log("Creating new user...");
      user = new User({
        googleId: uid,
        name: displayName,
        email,
        photoURL
      });
      await user.save();
      console.log("New user saved to MongoDB:", user._id);
    } else {
      console.log("Existing user found:", user._id);
    }

    return user;
  } catch (error) {
    console.error('Error saving user to database:', error);
    throw error;
  }
};

module.exports = { handleGoogleSignIn };