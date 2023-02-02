const { DataTypes } = require("sequelize");

const database = require("../services/database");
const Cliente = require("./cliente");
const Usuario = require("./usuario");

const Reserva = database.define(
  "Reserva",
  {
    dataReserva: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dataLimiteDevolucao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(12, 2),
    },
    clienteId: {
      type: DataTypes.INTEGER,
      References: {
        model: Cliente,
        key: "id",
      },
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      References: {
        model: Usuario,
        key: "id",
      },
    },
  },
  { tableName: "reservas", underscored: true }
);

module.exports = Reserva;
