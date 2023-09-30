// routes/notifications.js

const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const authenticate = require('../middleware/authMiddleware');

// Get all notifications for the authenticated user (protected route)
router.get('/', authenticate, notificationsController.getAllNotifications);

// Mark a notification as read (protected route)
router.put('/:notificationId', authenticate, notificationsController.markNotificationAsRead);

// ... (other notification routes)

module.exports = router;
