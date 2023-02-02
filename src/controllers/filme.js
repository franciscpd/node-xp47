const { Op } = require("sequelize");

const { Filme, Genero } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    const filmes = await Filme.findAll({
      include: Genero,
    });

    res.json(filmes);
  },
  getById: async (req, res) => {
    const {
      params: { id },
    } = req;
    const filme = await Filme.findByPk(id, { include: Genero });

    if (filme) {
      return res.json(filme);
    }

    res.sendStatus(404);
  },
  store: async (req, res) => {
    try {
      const {
        body: { nome, ano, duracao, generos = [] },
      } = req;

      const novoFilme = await Filme.create({
        nome,
        ano,
        duracao,
      });

      const generosData = await Genero.findAll({
        where: { id: { [Op.in]: generos } },
      });

      await novoFilme.setGeneros(generosData);

      res.status(201).json(novoFilme);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
  update: async (req, res) => {
    const {
      params: { id },
      body: { nome, ano, duracao, generos },
    } = req;

    const filme = await Filme.findByPk(id, { include: Genero });

    if (!filme) {
      res.sendStatus(404);
    }

    await filme.update({ nome, ano, duracao });

    if (Array.isArray(generos)) {
      const generosData = await Genero.findAll({
        where: { id: { [Op.in]: generos } },
      });

      await filme.setGeneros(generosData);
    }

    const filmeAtualizado = await Filme.findByPk(id, { include: Genero });

    res.json(filmeAtualizado);
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    const filme = await Filme.findByPk(id);

    if (!filme) {
      return res.sendStatus(404);
    }

    await filme.destroy();

    res.sendStatus(204);
  },
};
