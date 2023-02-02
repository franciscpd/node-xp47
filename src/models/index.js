const Filme = require("./filme");
const Genero = require("./genero");
const Reserva = require("./Reserva");
const Cliente = require("./Cliente");
const Endereco = require("./Endereco");
const FilmeGenero = require("./FilmeGenero");
const ReservaFilme = require("./ReservaFilme");
const Usuario = require("./usuario");

Cliente.hasMany(Reserva, { onDelete: "cascade" });
Cliente.hasOne(Endereco, { onDelete: "cascade" });

Usuario.hasMany(Reserva, { onDelete: "cascade" });

Endereco.belongsTo(Cliente, {
  foreignKey: "cliente_id",
});

Filme.belongsToMany(Genero, {
  foreignKey: "filme_id",
  through: FilmeGenero,
  onDelete: "cascade",
});
Filme.hasMany(ReservaFilme, { onDelete: "cascade" });

Genero.belongsToMany(Filme, {
  foreignKey: "genero_id",
  through: FilmeGenero,
  onDelete: "cascade",
});

Reserva.hasMany(ReservaFilme, { onDelete: "cascade" });
Reserva.belongsTo(Cliente, {
  foreignKey: "cliente_id",
});
Reserva.belongsTo(Usuario, {
  foreignKey: "usuario_id",
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
