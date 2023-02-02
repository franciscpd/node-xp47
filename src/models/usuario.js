const { DataTypes } = require("sequelize");

const database = require("../services/database");

const Usuario = database.define(
  "Usuario",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "usuarios",
    underscored: true,
  }
);

module.exports = Usuario;
