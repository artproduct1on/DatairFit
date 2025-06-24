const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const DATABASE_FILE_PATH = path.resolve(__dirname, '..', 'datairfit.db');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DATABASE_FILE_PATH,
  logging: false,
});

module.exports = sequelize;