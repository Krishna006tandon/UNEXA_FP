const express = require('express');
const { protect } = require('../utils/authMiddleware');
const router = express.Router();

// Test endpoint to verify token
router.get('/test-auth', protect, (req, res) => {
  res.json({ 
    message: 'Authentication successful',
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email
    }
  });
});

module.exports = router;