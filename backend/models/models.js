const database = require("../db");
const { DataTypes } = require("sequelize");

const User = database.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstname: { type: DataTypes.STRING, allowNull: true },
  lastname: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: true }
});

module.exports = { User };
