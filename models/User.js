// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  // ... (other fields)
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user', // Default role is 'user'
  },
});
