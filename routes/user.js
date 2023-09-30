// routes/user.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

// Get user profile (protected route)
router.get('/profile', authenticate, userController.getUserProfile);

// Update user profile (protected route)
router.put('/profile', authenticate, userController.updateUserProfile);

module.exports = router;
