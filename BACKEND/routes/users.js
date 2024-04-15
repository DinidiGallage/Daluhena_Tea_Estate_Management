const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Hardcoded login credentials
const hardcodedCredentials = {
  username: 'Operations Manager',
  password: 'password123',
};

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if username and password match the hardcoded credentials
    if (username !== hardcodedCredentials.username || password !== hardcodedCredentials.password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    // Return token to the client
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;