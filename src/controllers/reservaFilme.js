const { Filme, ReservaFilme, Reserva } = require("../models");

module.exports = {
  getAllByIdReserva: async (req, res) => {
    const {
      params: { reservaId },
    } = req;

    const reservaFilmes = await ReservaFilme.findAll(
      {
        include: [Filme],
      },
      {
        where: { reservaId },
      }
    );

    res.json(reservaFilmes);
  },
  store: async (req, res) => {
    const {
      body: { dataDevolucao, quantidade, valor, filmeId },
      params: { reservaId },
    } = req;

    const reserva = await Reserva.findByPk(reservaId);

    if (!reserva) {
      return res.sendStatus(404);
    }

    const reservaFilme = await ReservaFilme.create({
      dataDevolucao,
      quantidade,
      valor,
      filmeId,
      reservaId,
    });

    res.status(201).json(reservaFilme);
  },
  update: async (req, res) => {
    const {
      body: { dataDevolucao, quantidade, valor, filmeId },
      params: { id, reservaId },
    } = req;

    const reservaFilme = await ReservaFilme.findByPk(id);
    const reserva = await Reserva.findByPk(reservaId);

    if (!reserva || !reservaFilme) {
      return res.sendStatus(404);
    }

    if (reservaFilme.reservaId !== reserva.id) {
      return res.sendStatus(401);
    }

    await reservaFilme.update({
      dataDevolucao,
      quantidade,
      valor,
      filmeId,
    });

    res.sendStatus(204);
  },
  delete: async (req, res) => {
    const {
      params: { id, reservaId },
    } = req;

    const reservaFilme = await ReservaFilme.findByPk(id);
    const reserva = await Reserva.findByPk(reservaId);

    if (!reserva || !reservaFilme) {
      return res.sendStatus(404);
    }

    if (reservaFilme.reservaId !== reserva.id) {
      return res.sendStatus(401);
    }

    await reservaFilme.destroy();

    res.sendStatus(204);
  },
};
