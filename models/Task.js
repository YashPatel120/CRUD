
const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const authenticate = require('../middleware/authMiddleware');



const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  dueDate: {
    type: DataTypes.DATE,
  },
});

module.exports = Task;
module.exports = router;
