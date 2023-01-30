const { DataTypes } = require("sequelize");

const database = require("../services/database");

const Filme = database.define(
  "Filme",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ano: {
      type: DataTypes.CHAR(4),
      allowNull: false,
    },
    duracao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "filmes",
    timestamps: false,
  }
);

module.exports = Filme;
