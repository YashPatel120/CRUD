// controllers/searchController.js

const Task = require('../models/Task');
const Category = require('../models/Category');
const Tag = require('../models/Tag');

// Search for tasks by title
async function searchTasksByTitle(req, res) {
  try {
    const { title } = req.query;
    const userId = req.userId; // Get user ID from the authenticated user

    const tasks = await Task.findAll({
      where: {
        userId,
        title: { [Op.iLike]: `%${title}%` }, // Case-insensitive search
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Search tasks by title error:', error);
    res.status(500).json({ message: 'Error searching tasks by title' });
  }
}

// Filter tasks by category
async function filterTasksByCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const userId = req.userId; // Get user ID from the authenticated user

    const tasks = await Task.findAll({
      where: { userId, categoryId },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Filter tasks by category error:', error);
    res.status(500).json({ message: 'Error filtering tasks by category' });
  }
}

// Filter tasks by tag
async function filterTasksByTag(req, res) {
  try {
    const { tagId } = req.params;
    const userId = req.userId; // Get user ID from the authenticated user

    const tasks = await Task.findAll({
      where: { userId },
      include: {
        model: Tag,
        where: { id: tagId },
        through: { attributes: [] }, // Exclude tag attributes from result
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Filter tasks by tag error:', error);
    res.status(500).json({ message: 'Error filtering tasks by tag' });
  }
}

// ... (other search and filter controller actions)
