const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const EmailVerificationToken = sequelize.define("EmailVerificationToken", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }

}, {
  tableName: "EmailVerificationTokens",
  timestamps: true,
});

// RELATION
EmailVerificationToken.belongsTo(User, { foreignKey: "userId" });
User.hasOne(EmailVerificationToken, { foreignKey: "userId" });

module.exports = EmailVerificationToken;
