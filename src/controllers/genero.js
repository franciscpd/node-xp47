const { Genero } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    const generos = await Genero.findAll();

    res.json(generos);
  },
  getById: async (req, res) => {
    const {
      params: { id },
    } = req;
    const genero = await Genero.findByPk(id);

    if (genero) {
      return res.json(genero);
    }

    res.sendStatus(404);
  },
  store: async (req, res) => {
    try {
      const {
        body: { nome },
      } = req;

      const novoGenero = await Genero.create({
        nome,
      });

      res.json(novoGenero);
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
      body: { nome },
    } = req;

    const genero = await Genero.findByPk(id);

    if (!genero) {
      res.sendStatus(404);
    }

    await genero.update({ nome });

    res.json(genero);
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    const genero = await Genero.findByPk(id);

    if (!genero) {
      return res.sendStatus(404);
    }

    await genero.destroy();

    res.sendStatus(204);
  },
};
