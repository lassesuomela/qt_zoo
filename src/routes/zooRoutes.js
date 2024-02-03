const express = require("express");
const router = express.Router();

const zooController = require("../controllers/zooController");

router.get("/", zooController.getAllAnimals);
router.post("/", zooController.addAnimal);

module.exports = router;
