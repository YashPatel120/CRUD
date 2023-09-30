
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_manager_db', 'your_username', 'your_password', {
  host: 'localhost', // Your PostgreSQL server host
  dialect: 'postgres',
});

module.exports = sequelize;
