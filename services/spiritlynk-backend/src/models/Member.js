// services/spiritlynk-backend/src/models/Member.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Member = sequelize.define("Member", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  // Required fields
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName:  { type: DataTypes.STRING, allowNull: false },
  phone:     { type: DataTypes.STRING, allowNull: false, unique: true },
  gender:    { type: DataTypes.ENUM("male","female"), allowNull: false },

  // Optional fields
  email:    { type: DataTypes.STRING, allowNull: true, validate: { isEmail: true } },
  dateOfBirth: { type: DataTypes.DATEONLY, allowNull: true },
  address:  { type: DataTypes.STRING, allowNull: true },
  maritalStatus: { type: DataTypes.ENUM("single","married","divorced","widowed"), allowNull: true },
  occupation: { type: DataTypes.STRING, allowNull: true },
  isBaptized: { type: DataTypes.BOOLEAN, defaultValue: false },
  isWorker: { type: DataTypes.BOOLEAN, defaultValue: false },
  emergencyContactName: { type: DataTypes.STRING, allowNull: true },
  emergencyContactPhone: { type: DataTypes.STRING, allowNull: true },
  profilePhoto: { type: DataTypes.STRING, allowNull: true },
  notes: { type: DataTypes.TEXT, allowNull: true },

  joinedDate: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
}, {
  tableName: "members",
  timestamps: true
});

module.exports = Member;
