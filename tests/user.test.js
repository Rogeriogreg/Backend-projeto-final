const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/models");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe("User Endpoints", () => {
  let token = "";

  it("should create a new user", async () => {
    const res = await request(app).post("/v1/user").send({
      firstname: "John",
      surname: "Doe",
      email: "john@example.com",
      password: "123456",
      confirmPassword: "123456"
    });
    expect(res.statusCode).toEqual(201);
  });

  it("should return token", async () => {
    const res = await request(app).post("/v1/user/token").send({
      email: "john@example.com",
      password: "123456"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("should get user by id", async () => {
    const res = await request(app)
      .get("/v1/user/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.email).toEqual("john@example.com");
  });

  it("should update user", async () => {
    const res = await request(app)
      .put("/v1/user/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ firstname: "Updated", surname: "User", email: "john@example.com" });
    expect(res.statusCode).toEqual(204);
  });

  it("should delete user", async () => {
    const res = await request(app)
      .delete("/v1/user/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });
});
