const express = require("express");

const autenticacaoController = require("../controllers/autenticacao");
const autenticacaoValidator = require("../validators/autenticacao");

const router = express.Router();

router.post(
  "/login",
  autenticacaoValidator.login,
  autenticacaoController.login
);
router.post(
  "/registro",
  autenticacaoValidator.registro,
  autenticacaoController.registro
);

module.exports = router;
