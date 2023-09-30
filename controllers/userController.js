

const User = require('../models/User'); 

async function getUserProfile(req, res) {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
}

async function updateUserProfile(req, res) {
  try {
    const { username, email, fullName } = req.body;
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user information
    user.username = username;
    user.email = email;
    user.fullName = fullName;

    await user.save();

    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
}

module.exports = {
  getUserProfile,
  updateUserProfile,
};
