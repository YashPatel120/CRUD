// controllers/tasksController.js

const Task = require('../models/Task');

// Create a new task
async function createTask(req, res) {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.userId; // Get user ID from the authenticated user

    const task = await Task.create({ title, description, dueDate, userId });

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
}

// Get all tasks for a user
async function getAllTasks(req, res) {
  try {
    const userId = req.userId; // Get user ID from the authenticated user

    const tasks = await Task.findAll({ where: { userId } });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Get all tasks error:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
}

// Get a single task by ID
async function getTaskById(req, res) {
  try {
    const { taskId } = req.params;
    const userId = req.userId; // Get user ID from the authenticated user

    const task = await Task.findOne({ where: { id: taskId, userId } });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Get task by ID error:', error);
    res.status(500).json({ message: 'Error fetching task' });
  }
}

// Update a task by ID
async function updateTask(req, res) {
  try {
    const { taskId } = req.params;
    const { title, description, dueDate } = req.body;
    const userId = req.userId; // Get user ID from the authenticated user

    const task = await Task.findOne({ where: { id: taskId, userId } });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task information
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;

    await task.save();

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
}

// Delete a task by ID
async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;
    const userId = req.userId; // Get user ID from the authenticated user

    const task = await Task.findOne({ where: { id: taskId, userId } });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
