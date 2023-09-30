const express = require('express');
const router = express.Router();
const collaborationsController = require('../controllers/collaborationsController');
const authenticate = require('../middleware/authMiddleware');

router.post('/invite/:taskId', authenticate, collaborationsController.inviteCollaborator);

router.put('/response/:collaborationId', authenticate, collaborationsController.respondToInvitation);

router.delete('/:collaborationId', authenticate, collaborationsController.removeCollaborator);

module.exports = router;
