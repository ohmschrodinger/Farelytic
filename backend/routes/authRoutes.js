const express = require('express');
const { handleGoogleSignIn } = require('../controllers/authController');
const router = express.Router();

router.post('/google-signin', async (req, res) => {
  console.log('Request Body:', req.body); // Check the incoming data

  try {
    const user = await handleGoogleSignIn(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in Route:', error);
    res.status(500).json({ error: 'Failed to sign in' });
  }
});

module.exports = router;
