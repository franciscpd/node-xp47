const Filme = require("./filme");
const Genero = require("./genero");
const FilmeGenero = require("./filmeGenero");

Filme.belongsToMany(Genero, {
  foreignKey: "filme_id",
  through: FilmeGenero,
});

Genero.belongsToMany(Filme, {
  foreignKey: "genero_id",
  through: FilmeGenero,
});

module.exports = {
  Filme,
  Genero,
};
