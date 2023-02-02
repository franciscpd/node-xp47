const { Usuario, Cliente, Reserva, ReservaFilme, Filme } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    const reservas = await Reserva.findAll({
      include: [Usuario, Cliente, ReservaFilme, Filme],
    });

    res.json(reservas);
  },
  getById: async (req, res) => {
    const {
      params: { id },
    } = req;
    const reserva = await Reserva.findByPk(id, {
      include: [Usuario, Cliente, ReservaFilme, Filme],
    });

    if (!reserva) {
      return res.sendStatus(404);
    }

    res.json(reserva);
  },
  store: async (req, res) => {
    const {
      body: { dataReserva, dataLimiteDevolucao, clienteId },
      auth: { id: usuarioId },
    } = req;

    const reserva = await Reserva.create({
      dataReserva,
      dataLimiteDevolucao,
      clienteId,
      usuarioId,
    });

    res.status(201).json(reserva);
  },
  delete: async (req, res) => {
    const {
      params: { id },
    } = req;

    const reserva = await Reserva.findByPk(id);

    if (!reserva) {
      return res.sendStatus(404);
    }

    await reserva.destroy();

    res.sendStatus(204);
  },
};
