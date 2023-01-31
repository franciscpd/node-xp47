const { DataTypes } = require("sequelize");

const database = require("../services/database");

const Cliente = database.define(
  "Cliente",
  {
    nomeCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataNascimento: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "clientes", underscored: true }
);

module.exports = Cliente;
