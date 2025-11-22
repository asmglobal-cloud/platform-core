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

  // ✅ MATCH CONTROLLER FIELD NAME
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  role: {
    type: DataTypes.ENUM("admin", "pastor", "member"),
    defaultValue: "member",
  },

  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: "users",
  timestamps: true,
});

// RELATION
const EmailVerificationToken = require("./EmailVerificationToken");
User.hasOne(EmailVerificationToken, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = User;
