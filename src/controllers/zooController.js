const zooModel = require("../models/zooModel");

const getAllAnimals = (req, res) => {
  res.json(zooModel.getAll());
};

module.exports = {
  getAllAnimals,
};
