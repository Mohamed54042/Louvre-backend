// src/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // ex: 'event_db'
  process.env.DB_USER,      // ex: 'root'
  process.env.DB_PASSWORD,  // ex: 'password'
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: console.log,  // ou false pour désactiver les logs SQL
  }
);

module.exports = sequelize;
