const express = require("express");

const filmeController = require("../controllers/filme");

const router = express.Router();

router.get("/", filmeController.getAll);
router.get("/:id", filmeController.getById);
router.post("/", filmeController.store);
router.put("/:id", filmeController.update);
router.delete("/:id", filmeController.destroy);

module.exports = router;
