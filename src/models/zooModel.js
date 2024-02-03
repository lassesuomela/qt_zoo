const animals = [];

const getAll = () => {
  return animals;
};

/**
 *
 * @param {{species: string, name: string, age: number, habitat: string}} animal
 */
const add = (animal) => {
  const lastId = animals[animals.length - 1]?.id || 0;
  animal.id = lastId + 1;
  animals.push(animal);
};

module.exports = {
  getAll,
  add,
};
