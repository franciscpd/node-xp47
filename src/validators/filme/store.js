const { validate, Joi } = require("express-validation");

module.exports = validate({
  body: Joi.object({
    nome: Joi.string().required().min(3),
    ano: Joi.string().required().min(4).max(4),
    duracao: Joi.number().integer().required(),
    generos: Joi.array().items(Joi.number().integer()),
  }),
});
