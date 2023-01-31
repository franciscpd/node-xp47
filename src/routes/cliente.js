const express = require("express");

const clienteController = require("../controllers/cliente");

const router = express.Router();

router.get("/", clienteController.getAll);
router.get("/:id", clienteController.getById);
router.post("/", clienteController.store);
router.put("/:id", clienteController.update);
router.delete("/:id", clienteController.destroy);

module.exports = router;
