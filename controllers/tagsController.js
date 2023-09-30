
const Tag = require('../models/Tag');

async function createTag(req, res) {
  try {
    const { name } = req.body;
    const userId = req.userId; 

    const tag = await Tag.create({ name, userId });

    res.status(201).json(tag);
  } catch (error) {
    console.error('Create tag error:', error);
    res.status(500).json({ message: 'Error creating tag' });
  }
}

async function getAllTags(req, res) {
  try {
    const userId = req.userId; // Get user ID from the authenticated user

    const tags = await Tag.findAll({ where: { userId } });

    res.status(200).json(tags);
  } catch (error) {
    console.error('Get all tags error:', error);
    res.status(500).json({ message: 'Error fetching tags' });
  }
}

