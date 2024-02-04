const request = require("supertest");
const app = require("../../../app");

describe("GET /animals", () => {
  test("Get with no data", async () => {
    const res = await request(app).get("/animals").expect(200);
    expect(res.body.animals).toEqual([]);
  });

  test("Add animal and fetch all animals", async () => {
    const body = {
      species: "Lion",
      name: "King",
      age: 13,
      habitat: "Savannah",
    };

    const addAnimalRes = await request(app)
      .post("/animals")
      .send(body)
      .expect(201);

    expect(addAnimalRes.body).toEqual({ message: "Animal added" });

    const getAllAnimalsRes = await request(app).get("/animals").expect(200);

    body.id = 1;
    expect(getAllAnimalsRes.body.animals).toEqual([body]);
  });
});

describe("GET /animals/page/:page", () => {
  test("Add animal and fetch all animals", async () => {
    const body = {
      species: "Lion",
      name: "King",
      age: 13,
      habitat: "Savannah",
    };

    for (let index = 0; index < 3; index++) {
      await request(app).post("/animals").send(body).expect(201);
    }

    const res = await request(app).get("/animals/page/1").expect(200);

    expect(res.body.animalCount).toEqual(4);
    expect(res.body.pageSize).toEqual(5);
    expect(res.body.maxPage).toEqual(1);

    await request(app).post("/animals").send(body).expect(201);

    const page = await request(app).get("/animals/page/1").expect(200);

    expect(page.body.maxPage).toEqual(1);

    await request(app).post("/animals").send(body).expect(201);

    const page2 = await request(app).get("/animals/page/2").expect(200);

    expect(page2.body.maxPage).toEqual(2);
    expect(page2.body.animals.length).toEqual(1);
    expect(page2.body.animals[0].id).toEqual(6);
  });

  test("Fetch with invalid page number", async () => {
    const res = await request(app).get("/animals/page/-1").expect(400);
    expect(res.body).toEqual({ error: "Invalid page number" });
  });
});

describe("GET /animals/:id", () => {
  test("Get with data", async () => {
    const res = await request(app).get("/animals/1").expect(200);

    expect(res.body.animal).toEqual({
      age: 13,
      habitat: "Savannah",
      id: 1,
      name: "King",
      species: "Lion",
    });
  });

  test("Get with non number id", async () => {
    const res = await request(app).get("/animals/asd").expect(404);

    expect(res.body).toEqual({ error: "Animal not found with that id" });
  });

  test("Get with invalid id", async () => {
    const res = await request(app).get("/animals/132").expect(404);

    expect(res.body).toEqual({ error: "Animal not found with that id" });
  });
});

describe("POST /animals", () => {
  test("Post with no data", async () => {
    const res = await request(app).post("/animals").expect(400);

    expect(res.body).toEqual({ error: "Missing required parameters" });
  });

  test("Post with valid data", async () => {
    const res = await request(app)
      .post("/animals")
      .send({
        species: "Lion",
        name: "King",
        age: 13,
        habitat: "Savannah",
      })
      .expect(201);

    expect(res.body).toEqual({ message: "Animal added" });
  });

  test("Post with invalid age", async () => {
    const res = await request(app)
      .post("/animals")
      .send({
        species: "Lion",
        name: "King",
        age: "asdasd",
        habitat: "Savannah",
      })
      .expect(400);

    expect(res.body).toEqual({ error: "Age must be a positive number" });
  });

  test("Post with invalid age", async () => {
    const res = await request(app)
      .post("/animals")
      .send({
        species: "Lion",
        name: "King",
        age: -50,
        habitat: "Savannah",
      })
      .expect(400);

    expect(res.body).toEqual({ error: "Age must be a positive number" });
  });
});

describe("PUT /animals/:id", () => {
  test("Put with no data", async () => {
    const res = await request(app).put("/animals/123465").expect(400);

    expect(res.body).toEqual({ error: "Missing required parameters" });
  });

  test("Put with invalid id with data", async () => {
    const res = await request(app)
      .put("/animals/123465")
      .send({
        species: "Test",
        name: "Name",
        age: 100,
        habitat: "New habitat",
      })
      .expect(404);

    expect(res.body).toEqual({
      error: "Animal not found with that id, unable to update",
    });
  });

  test("Put with valid id with data", async () => {
    const res = await request(app)
      .put("/animals/1")
      .send({
        species: "New test",
        name: "Name test",
        age: 200,
        habitat: "New habitat",
      })
      .expect(200);

    expect(res.body).toEqual({
      message: "Animal updated",
    });
  });

  test("Put with valid id with invalid age", async () => {
    const res = await request(app)
      .put("/animals/1")
      .send({
        species: "New test",
        name: "Name test",
        age: -50,
        habitat: "New habitat",
      })
      .expect(400);

    expect(res.body).toEqual({
      error: "Age must be a positive number",
    });
  });
});

describe("DELETE /animals/:id", () => {
  test("Create animal", async () => {
    const res = await request(app)
      .post("/animals")
      .send({
        species: "Lion",
        name: "King",
        age: 13,
        habitat: "Savannah",
      })
      .expect(201);

    expect(res.body).toEqual({ message: "Animal added" });
  });

  test("Delete animal with valid id", async () => {
    await request(app)
      .post("/animals")
      .send({
        species: "Lion",
        name: "King",
        age: 13,
        habitat: "Savannah",
      })
      .expect(201);

    const res = await request(app).delete("/animals/1").expect(200);

    expect(res.body).toEqual({ message: "Animal deleted" });
  });

  test("Delete animal with non existing id", async () => {
    const res = await request(app).delete("/animals/123").expect(404);

    expect(res.body).toEqual({
      error: "Animal not found with that id, unable to delete",
    });
  });
});
