// controllers/notificationsController.js

const Notification = require('../models/Notification');

// Get all notifications for the authenticated user
async function getAllNotifications(req, res) {
  try {
    const userId = req.userId; // Get user ID from the authenticated user

    const notifications = await Notification.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']], // Order by most recent
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Get all notifications error:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
}

// Mark a notification as read
async function markNotificationAsRead(req, res) {
  try {
    const { notificationId } = req.params;
    const userId = req.userId; // Get user ID from the authenticated user

    // Find the notification
    const notification = await Notification.findByPk(notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Check if the notification belongs to the authenticated user
    if (notification.userId !== userId) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Mark the notification as read
    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark notification as read error:', error);
    res.status(500).json({ message: 'Error marking notification as read' });
  }
}

// ... (other notification controller actions)
