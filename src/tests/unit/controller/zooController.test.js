const zooController = require("../../../controllers/zooController");
const httpMocks = require("node-mocks-http");

describe("zooController", () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  test("Get all animals with no data", () => {
    zooController.getAllAnimals(req, res);

    const data = res._getJSONData();
    expect(data).toEqual([]);
  });

  test("Add animal with valid data", () => {
    req.body = {
      species: "Lion",
      name: "King",
      age: 13,
      habitat: "Savannah",
    };

    zooController.addAnimal(req, res);

    const data = res._getJSONData();
    expect(data).toEqual({ message: "Animal added" });
  });

  test("Add second animal with valid data", () => {
    req.body = {
      species: "Cat",
      name: "Puss in Boots",
      age: 9,
      habitat: "San Ricardo",
    };

    zooController.addAnimal(req, res);

    const data = res._getJSONData();
    expect(data).toEqual({ message: "Animal added" });
  });

  test("Get all animals with data", () => {
    zooController.getAllAnimals(req, res);

    const data = res._getJSONData();
    expect(data).toEqual([
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
});
