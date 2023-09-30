
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tag = sequelize.define('Tag', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add more fields as needed
});

module.exports = Tag;
