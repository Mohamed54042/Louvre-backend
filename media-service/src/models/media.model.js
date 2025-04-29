const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Media = sequelize.define('Media', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING, // image, video, texte...
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: true, // si relié à un événement
  },
}, {
  tableName: 'media',
  timestamps: true,
});

module.exports = Media;
