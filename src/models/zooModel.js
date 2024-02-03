const animals = {};

/**
 * @returns {Array<{species: string, name: string, age: number, habitat: string, id: number}>}
 */
const getAll = () => {
  return Object.values(animals);
};

/**
 * @param {{species: string, name: string, age: number, habitat: string}} animal
 */
const add = (animal) => {
  const newId = Object.keys(animals).length + 1;

  animal.id = newId;

  animals[newId] = animal;
};

/**
 * @param {{species: string, name: string, age: number, habitat: string}} animal
 * @param {number} id
 */
const updateById = (animal, id) => {
  if (animals[id]) {
    animals[id] = { ...animals[id], ...animal };
    return true;
  }
  return false;
};

/**
 * @param {number} id
 * @returns {{species: string, name: string, age: number, habitat: string, id: number} | null}
 */
const getById = (id) => {
  return animals[id] || null;
};

const deleteById = (id) => {
  if (animals[id]) {
    delete animals[id];
    return true;
  }
  return false;
};

module.exports = {
  getAll,
  add,
  updateById,
  getById,
  deleteById,
};
