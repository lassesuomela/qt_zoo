const express = require("express");
const router = express.Router();

const zooController = require("../controllers/zooController");

router.get("/", zooController.getAllAnimals);
router.get("/:id", zooController.getById);
router.get("/page/:page", zooController.getAnimalsByPage);
router.post("/", zooController.addAnimal);
router.put("/:id", zooController.updateAnimal);
router.delete("/:id", zooController.deleteAnimalById);

module.exports = router;
