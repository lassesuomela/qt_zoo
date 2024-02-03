const zooModel = require("../models/zooModel");

const getAllAnimals = (req, res) => {
  res.json(zooModel.getAll());
};

const addAnimal = (req, res) => {
  const { species, name, age, habitat } = req.body;

  if (!species || !name || !age || !habitat) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  if (typeof age !== "number" || age < 0) {
    return res.status(400).json({ error: "Age must be a positive number" });
  }

  zooModel.add({ species, name, age, habitat });
  res.status(201).json({ message: "Animal added" });
};

const updateAnimal = (req, res) => {
  const { species, name, age, habitat } = req.body;
  const { id } = req.params;

  if (!species || !name || !age || !habitat) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  if (typeof age !== "number" || age < 0) {
    return res.status(400).json({ error: "Age must be a positive number" });
  }

  if (zooModel.updateById({ species, name, age, habitat }, id)) {
    res.json({ message: "Animal updated" });
  } else {
    res
      .status(404)
      .json({ error: "Animal not found with that id, unable to update" });
  }
};

module.exports = {
  getAllAnimals,
  addAnimal,
  updateAnimal,
};
