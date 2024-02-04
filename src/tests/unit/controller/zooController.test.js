const zooController = require("../../../controllers/zooController");
const httpMocks = require("node-mocks-http");

describe("zooController", () => {
  let req, res;

  const lion = {
    species: "Lion",
    name: "King",
    age: 13,
    habitat: "Savannah",
  };

  const cat = {
    species: "Cat",
    name: "Puss in Boots",
    age: 9,
    habitat: "San Ricardo",
  };

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  test("Get all animals with no data", () => {
    zooController.getAllAnimals(req, res);

    const data = res._getJSONData();
    expect(data.animals).toEqual([]);
  });

  test("Add animal with valid data", () => {
    req.body = lion;

    zooController.addAnimal(req, res);

    const data = res._getJSONData();
    expect(data).toEqual({ message: "Animal added" });
  });

  test("Add second animal with valid data", () => {
    req.body = cat;

    zooController.addAnimal(req, res);

    const data = res._getJSONData();
    expect(data).toEqual({ message: "Animal added" });
  });

  test("Get all animals with data", () => {
    zooController.getAllAnimals(req, res);

    const data = res._getJSONData();
    expect(data.animals).toEqual([
      {
        species: "Lion",
        name: "King",
        age: 13,
        habitat: "Savannah",
        id: 1,
      },
      {
        species: "Cat",
        name: "Puss in Boots",
        age: 9,
        habitat: "San Ricardo",
        id: 2,
      },
    ]);
  });

  test("Update animal with valid data", () => {
    req.params.id = 2;
    req.body = {
      species: "Kitty cat",
      name: "Kitty Softpaws",
      age: 14,
      habitat: "Savannah",
    };

    zooController.updateAnimal(req, res);

    const data = res._getJSONData();
    expect(data).toEqual({ message: "Animal updated" });
  });

  test("Get animal by id", () => {
    req.params.id = 2;

    zooController.getById(req, res);

    const data = res._getJSONData();
    expect(data.animal).toEqual({
      species: "Kitty cat",
      name: "Kitty Softpaws",
      age: 14,
      habitat: "Savannah",
      id: 2,
    });
  });

  test("Get animal with non existing id", () => {
    req.params.id = 123;

    zooController.getById(req, res);

    const data = res._getJSONData();
    expect(data).toEqual({ error: "Animal not found with that id" });
  });

  test("Update animal with invalid id", () => {
    req.params.id = -213;
    req.body = {
      species: "Kitty cat",
      name: "Kitty Softpaws",
      age: 14,
      habitat: "Savannah",
    };

    zooController.updateAnimal(req, res);

    const data = res._getJSONData();
    expect(data).toEqual({
      error: "Animal not found with that id, unable to update",
    });
  });

  test("Update animal with missing data", () => {
    req.params.id = 2;
    req.body = {
      species: "Kitty cat",
      name: "Kitty Softpaws",
      age: 14,
    };

    zooController.updateAnimal(req, res);

    const data = res._getJSONData();
    expect(data).toEqual({ error: "Missing required parameters" });
  });

  test("Update animal with invalid data", () => {
    req.params.id = 2;
    req.body = {
      species: "Kitty cat",
      name: "Kitty Softpaws",
      age: -230,
      habitat: "Savannah",
    };

    zooController.updateAnimal(req, res);

    const data = res._getJSONData();
    expect(data).toEqual({ error: "Age must be a positive number" });
  });

  test("Add animal with invalid data", () => {
    req.body = {
      species: "Lion",
    };

    zooController.addAnimal(req, res);

    const data = res._getJSONData();
    expect(data).toEqual({ error: "Missing required parameters" });
  });

  test("Add animal with invalid age", () => {
    req.body = {
      species: "Lion",
      name: "King",
      age: "asd",
      habitat: "Savannah",
    };

    zooController.addAnimal(req, res);

    const data = res._getJSONData();
    expect(data).toEqual({ error: "Age must be a positive number" });
  });

  test("Add animal with negative age", () => {
    req.body = {
      species: "Lion",
      name: "King",
      age: -250,
      habitat: "Savannah",
    };

    zooController.addAnimal(req, res);

    const data = res._getJSONData();
    expect(data).toEqual({ error: "Age must be a positive number" });
  });

  test("Delete animal by id", () => {
    req.params.id = 1;

    zooController.deleteAnimalById(req, res);

    const data = res._getJSONData();
    expect(data).toEqual({ message: "Animal deleted" });
  });

  test("Delete animal that has already been deleted", () => {
    req.params.id = 1;

    zooController.deleteAnimalById(req, res);

    const data = res._getJSONData();
    expect(data).toEqual({
      error: "Animal not found with that id, unable to delete",
    });
  });
});
