const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Usuario } = require("../models");
const secret = require("../config/secret");

module.exports = {
  login: async (req, res) => {
    const {
      body: { email, senha },
    } = req;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
      return res.status(401).json({ message: "Usuário ou senha inválido" });
    }

    const dadosUsuario = {
      id: usuario.id,
      nome: usuario.nome,
    };

    const token = jwt.sign(dadosUsuario, secret.key);

    res.status(201).json({
      token,
      usuario: dadosUsuario,
    });
  },
  registro: async (req, res) => {
    const {
      body: { nome, email, senha },
    } = req;

    const hashSenha = bcrypt.hashSync(senha, 10);

    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const { id } = await Usuario.create({
      nome,
      email,
      senha: hashSenha,
    });

    const usuario = {
      id,
      nome,
    };

    const token = jwt.sign(usuario, secret.key);

    res.status(201).json({
      token,
      usuario,
    });
  },
};
