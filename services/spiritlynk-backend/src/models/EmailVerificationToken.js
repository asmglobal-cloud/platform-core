const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const EmailVerificationToken = sequelize.define(
  "EmailVerificationToken",
  {
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
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    tableName: "EmailVerificationTokens",
    timestamps: true,
  }
);

module.exports = EmailVerificationToken;
