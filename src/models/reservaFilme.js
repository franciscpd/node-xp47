const { DataTypes } = require("sequelize");

const database = require("../services/database");
const Filme = require("./filme");
const Reserva = require("./reserva");

const ReservaFilme = database.define(
  "ReservaFilme",
  {
    dataDevolucao: {
      type: DataTypes.DATE,
    },
    quantidade: {
      type: DataTypes.INTEGER,
    },
    valor: {
      type: DataTypes.DECIMAL(12, 2),
    },
    reservaId: {
      type: DataTypes.INTEGER,
      References: {
        model: Reserva,
        key: "id",
      },
    },
    filmeId: {
      type: DataTypes.INTEGER,
      References: {
        model: Filme,
        key: "id",
      },
    },
  },
  { tableName: "reserva_filmes", underscored: true }
);

module.exports = ReservaFilme;
