const express = require("express");
const router = express.Router();

const zooController = require("../controllers/zooController");

router.get("/animals", zooController.getAllAnimals);

module.exports = router;
