const { Usuario } = require("../models");

module.exports = async (req, res, next) => {
  if (req.auth) {
    const usuario = await Usuario.findByPk(req.auth.id);

    if (!usuario) {
      next({
        status: 401,
        name: "UnauthorizedError",
        inner: {
          message: "Usuário não encontrado",
        },
      });
    }

    next();
  }
};
