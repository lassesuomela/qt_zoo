const request = require("supertest");
const app = require("../../../app");

describe("GET /animals", () => {
  test("Get with no data", () => {
    request(app)
      .get("/animals")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([]);
      });
  });

  test("Add animal and fetch all animals", (done) => {
    const body = {
      species: "Lion",
      name: "King",
      age: 13,
      habitat: "Savannah",
    };
    request(app)
      .post("/animals")
      .set("Accept", "application/json")
      .send(body)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({ message: "Animal added" });
        request(app)
          .get("/animals")
          .expect(200)
          .then((res) => {
            body.id = 1;
            expect(res.body).toEqual([body]);
            return done();
          });
      });
  });
});
