//[M1S10] Ex 1 - Continuando Trindade Places
const { Sequelize } = require("sequelize");
const connection = require("../database/db");

const User = connection.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    min: 8,
    allowNull: false,
  },
});

module.exports = User;
