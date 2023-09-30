// controllers/categoriesController.js

const Category = require('../models/Category');

// Create a new category
async function createCategory(req, res) {
  try {
    const { name } = req.body;
    const userId = req.userId; // Get user ID from the authenticated user

    const category = await Category.create({ name, userId });

    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Error creating category' });
  }
}

// Get all categories for a user
async function getAllCategories(req, res) {
  try {
    const userId = req.userId; // Get user ID from the authenticated user

    const categories = await Category.findAll({ where: { userId } });

    res.status(200).json(categories);
  } catch (error) {
    console.error('Get all categories error:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
}

// ... (other category controller actions)
