const express = require("express");
const router = express.Router();

const zooController = require("../controllers/zooController");

router.get("/", zooController.getAllAnimals);
router.post("/", zooController.addAnimal);
router.put("/:id", zooController.updateAnimal);

module.exports = router;
