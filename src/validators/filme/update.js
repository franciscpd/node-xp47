const { validate, Joi } = require("express-validation");

module.exports = validate({
  params: Joi.object({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object({
    nome: Joi.string().min(3),
    ano: Joi.string().min(4).max(4),
    duracao: Joi.number().integer(),
    generos: Joi.array().items(Joi.number().integer()),
  }),
});
