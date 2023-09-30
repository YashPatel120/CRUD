// controllers/collaborationsController.js

const Collaboration = require('../models/Collaboration');
const Task = require('../models/Task');

// Invite a user to collaborate on a task
async function inviteCollaborator(req, res) {
  try {
    const { taskId } = req.params;
    const { userIdToInvite } = req.body;
    const userId = req.userId; // Get the ID of the inviting user

    // Check if the task exists
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the inviting user is the task owner
    if (task.userId !== userId) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Check if the invited user exists (you may want to do additional checks here)
    // Assuming you have a User model
    const userToInvite = await User.findByPk(userIdToInvite);

    if (!userToInvite) {
      return res.status(404).json({ message: 'User to invite not found' });
    }

    // Create a collaboration record to track the invitation
    const collaboration = await Collaboration.create({
      taskId,
      userId: userIdToInvite,
      status: 'pending', // You can define different statuses (e.g., 'accepted', 'declined')
    });

    res.status(201).json(collaboration);
  } catch (error) {
    console.error('Invite collaborator error:', error);
    res.status(500).json({ message: 'Error inviting collaborator' });
  }
}

// Accept or decline a collaboration invitation
async function respondToInvitation(req, res) {
  try {
    const { collaborationId } = req.params;
    const { response } = req.body;
    const userId = req.userId; // Get the ID of the responding user

    // Find the collaboration record
    const collaboration = await Collaboration.findByPk(collaborationId);

    if (!collaboration) {
      return res.status(404).json({ message: 'Collaboration invitation not found' });
    }

    // Check if the user is the invited user
    if (collaboration.userId !== userId) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Update the collaboration status based on the response
    if (response === 'accept') {
      collaboration.status = 'accepted';
    } else if (response === 'decline') {
      collaboration.status = 'declined';
    } else {
      return res.status(400).json({ message: 'Invalid response' });
    }

    await collaboration.save();

    res.status(200).json({ message: 'Collaboration response updated successfully' });
  } catch (error) {
    console.error('Respond to invitation error:', error);
    res.status(500).json({ message: 'Error responding to invitation' });
  }
}

// Remove a collaborator from a task
async function removeCollaborator(req, res) {
  try {
    const { collaborationId } = req.params;
    const userId = req.userId; // Get the ID of the user making the request

    // Find the collaboration record
    const collaboration = await Collaboration.findByPk(collaborationId);

    if (!collaboration) {
      return res.status(404).json({ message: 'Collaboration not found' });
    }

    // Check if the user has permission to remove the collaborator
    if (collaboration.userId !== userId) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Delete the collaboration record
    await collaboration.destroy();

    res.status(200).json({ message: 'Collaborator removed successfully' });
  } catch (error) {
    console.error('Remove collaborator error:', error);
    res.status(500).json({ message: 'Error removing collaborator' });
  }
}

module.exports = {
  inviteCollaborator,
  respondToInvitation,
  removeCollaborator,
};
