const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'spiritlynk',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'supersecret',
  {
    host: process.env.DB_HOST || 'spiritlynk-db', // ✅ Must match docker service name
    dialect: 'postgres',
    logging: console.log, // (you can disable later)
  }
);

module.exports = sequelize;
