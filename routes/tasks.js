// routes/tasks.js

const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const authenticate = require('../middleware/authMiddleware');

router.post('/', authenticate, tasksController.createTask);

router.get('/', authenticate, tasksController.getAllTasks);

router.get('/:taskId', authenticate, tasksController.getTaskById);

router.put('/:taskId', authenticate, tasksController.updateTask);

router.delete('/:taskId', authenticate, tasksController.deleteTask);

module.exports = router;
