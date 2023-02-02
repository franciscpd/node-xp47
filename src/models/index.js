const Filme = require("./filme");
const Genero = require("./genero");
const Reserva = require("./Reserva");
const Cliente = require("./Cliente");
const Endereco = require("./Endereco");
const FilmeGenero = require("./FilmeGenero");
const ReservaFilme = require("./ReservaFilme");
const Usuario = require("./usuario");

Cliente.hasMany(Reserva);
Cliente.hasOne(Endereco);

Endereco.belongsTo(Cliente, {
  foreignKey: "cliente_id",
});

Filme.belongsToMany(Genero, {
  foreignKey: "filme_id",
  through: FilmeGenero,
});
Filme.hasMany(ReservaFilme);

Genero.belongsToMany(Filme, {
  foreignKey: "genero_id",
  through: FilmeGenero,
});

Reserva.hasMany(ReservaFilme);
Reserva.belongsTo(Cliente, {
  foreignKey: "cliente_id",
});

ReservaFilme.belongsTo(Reserva, {
  foreignKey: "reserva_id",
});
ReservaFilme.belongsTo(Filme, {
  foreignKey: "filme_id",
});

module.exports = {
  Filme,
  Genero,
  Cliente,
  Endereco,
  Reserva,
  ReservaFilme,
  Usuario,
};
