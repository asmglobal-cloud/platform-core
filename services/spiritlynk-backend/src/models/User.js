const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  // 🔥 UPDATED ROLE LIST
  role: {
    type: DataTypes.ENUM("superadmin", "admin", "pastor", "member", "visitor"),
    defaultValue: "visitor",
  },

  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

}, {
  tableName: "users",
  timestamps: true,
});

// RELATIONSHIP
const EmailVerificationToken = require("./EmailVerificationToken");
User.hasOne(EmailVerificationToken, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = User;
