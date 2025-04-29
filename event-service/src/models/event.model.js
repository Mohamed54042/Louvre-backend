const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assure-toi que ce chemin est correct

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  civilization: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  theme: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'Events',
  timestamps: true,
});

module.exports = Event;
