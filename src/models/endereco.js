const { DataTypes } = require("sequelize");

const database = require("../services/database");
const Cliente = require("./cliente");

const Endereco = database.define(
  "Endereco",
  {
    rua: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clienteId: {
      type: DataTypes.INTEGER,
      References: {
        model: Cliente,
        key: "id",
      },
      unique: true,
    },
  },
  { tableName: "enderecos", underscored: true }
);

module.exports = Endereco;
