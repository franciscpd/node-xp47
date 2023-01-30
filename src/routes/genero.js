const express = require("express");

const generoController = require("../controllers/genero");

const router = express.Router();

router.get("/", generoController.getAll);
router.get("/:id", generoController.getById);
router.post("/", generoController.store);
router.put("/:id", generoController.update);
router.delete("/:id", generoController.destroy);

module.exports = router;
