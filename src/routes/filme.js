const express = require("express");

const filmeController = require("../controllers/filme");
const filmeValidator = require("../validators/filme");

const router = express.Router();

router.get("/", filmeController.getAll);
router.get("/:id", filmeValidator.getById, filmeController.getById);
router.post("/", filmeValidator.store, filmeController.store);
router.put("/:id", filmeValidator.update, filmeController.update);
router.delete("/:id", filmeValidator.destroy, filmeController.destroy);

module.exports = router;
