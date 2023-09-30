// models/Collaboration.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Collaboration = sequelize.define('Collaboration', {
  // You may need additional fields here based on your requirements
});

module.exports = Collaboration;
