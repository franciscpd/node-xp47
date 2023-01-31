const { Cliente, Endereco } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    try {
      const clientes = await Cliente.findAll({ include: Endereco });

      res.json(clientes);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
  getById: async (req, res) => {
    const {
      params: { id },
    } = req;
    const cliente = await Cliente.findByPk(id, { include: Endereco });

    if (cliente) {
      return res.json(cliente);
    }

    res.sendStatus(404);
  },
  store: async (req, res) => {
    try {
      const {
        body: {
          nome_completo: nomeCompleto,
          cpf,
          telefone,
          email,
          data_nascimento: dataNascimento,
          endereco = {},
        },
      } = req;

      const { rua, numero, bairro, cidade, estado, cep } = endereco;

      const novoCliente = await Cliente.create({
        nomeCompleto,
        cpf,
        telefone,
        email,
        dataNascimento,
      });

      if (Object.keys(endereco).length > 1) {
        await Endereco.create({
          rua,
          numero,
          bairro,
          cidade,
          estado,
          cep,
          clienteId: novoCliente.id,
        });
      }

      const clienteAtualizado = await Cliente.findByPk(novoCliente.id, {
        include: Endereco,
      });

      res.status(201).json(clienteAtualizado);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
  update: async (req, res) => {
    try {
      const {
        params: { id },
        body: {
          nome_completo: nomeCompleto,
          cpf,
          telefone,
          email,
          data_nascimento: dataNascimento,
          endereco,
        },
      } = req;

      const { rua, numero, bairro, cidade, estado, cep } = endereco;

      const cliente = await Cliente.findByPk(id, { include: Endereco });

      if (!cliente) {
        res.sendStatus(404);
      }

      await cliente.update({
        nomeCompleto,
        cpf,
        telefone,
        email,
        dataNascimento,
      });

      if (cliente.Endereco?.id) {
        await Endereco.update(
          { rua, numero, bairro, cidade, estado, cep },
          { where: { id: cliente.Endereco.id } }
        );
      } else {
        await Endereco.create({
          rua,
          numero,
          bairro,
          cidade,
          estado,
          cep,
          clienteId: id,
        });
      }

      const clienteAtualizado = await Cliente.findByPk(id, {
        include: Endereco,
      });

      res.json(clienteAtualizado);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
  destroy: async (req, res) => {
    const {
      params: { id },
    } = req;

    try {
      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        res.sendStatus(404);
      }

      await cliente.destroy();

      res.sendStatus(204);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
};
