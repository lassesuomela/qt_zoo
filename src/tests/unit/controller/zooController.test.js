const zooController = require("../../../controllers/zooController");
const httpMocks = require("node-mocks-http");

describe("zooController", () => {
  test("getAllAnimals()", () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    zooController.getAllAnimals(req, res);

    const data = res._getJSONData();
    expect(data).toEqual([]);
  });
});
