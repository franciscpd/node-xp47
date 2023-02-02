const express = require("express");

const reservaController = require("../controllers/reserva");
const reservaFilmeController = require("../controllers/reservaFilme");

const router = express.Router();

router.get("/", reservaController.getAll);
router.get("/:id", reservaController.getById);
router.post("/", reservaController.store);

router.get("/:reservaId/filmes", reservaFilmeController.getAllByIdReserva);
router.post("/:reservaId/filmes", reservaFilmeController.store);
router.put("/:reservaId/filmes/:id", reservaFilmeController.update);
router.delete("/:reservaId/filmes/:id", reservaFilmeController.delete);

module.exports = router;
