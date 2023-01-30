const { DataTypes } = require("sequelize");

const database = require("../services/database");

const Genero = database.define(
  "Genero",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "generos",
    timestamps: false,
  }
);

module.exports = Genero;
