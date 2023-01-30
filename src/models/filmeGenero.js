const database = require("../services/database");

const FilmeGenero = database.define(
  "FilmeGenero",
  {},
  { tableName: "filme_generos", timestamps: false }
);

module.exports = FilmeGenero;
