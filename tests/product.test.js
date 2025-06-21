const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/models");

let token;

beforeAll(async () => {
  // Criação de usuário para autenticação
  await request(app).post("/v1/user").send({
    firstname: "Product",
    surname: "Tester",
    email: "product@test.com",
    password: "123456",
    confirmPassword: "123456"
  });

  const response = await request(app).post("/v1/user/token").send({
    email: "product@test.com",
    password: "123456"
  });

  token = response.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe("CRUD de Produto", () => {
  let categoryId;
  let productId;

  beforeAll(async () => {
    const response = await request(app)
      .post("/v1/category")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Tênis",
        slug: "tenis",
        use_in_menu: true
      });

    categoryId = response.body.id;
  });

  it("Deve criar um novo produto", async () => {
    const response = await request(app)
      .post("/v1/product")
      .set("Authorization", `Bearer ${token}`)
      .send({
        enabled: true,
        name: "Produto Teste",
        slug: "produto-teste",
        stock: 10,
        description: "Produto para testes",
        price: 100.0,
        price_with_discount: 90.0,
        category_ids: [categoryId],
        images: [
          {
            type: "image/png",
            content: "base64fake1"
          }
        ],
        options: [
          {
            title: "Cor",
            shape: "square",
            type: "text",
            values: ["Azul", "Vermelho"]
          }
        ]
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    productId = response.body.id;
  });

  it("Deve buscar uma lista de produtos", async () => {
    const response = await request(app).get("/v1/product/search");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
  });

  it("Deve buscar produto por ID", async () => {
    const response = await request(app).get(`/v1/product/${productId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", productId);
  });

  it("Deve atualizar um produto", async () => {
    const response = await request(app)
      .put(`/v1/product/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Produto Teste Atualizado",
        slug: "produto-atualizado",
        stock: 5,
        price: 200.0,
        price_with_discount: 180.0,
        category_ids: [categoryId],
        images: [],
        options: []
      });

    expect(response.statusCode).toBe(204);
  });

  it("Deve deletar o produto", async () => {
    const response = await request(app)
      .delete(`/v1/product/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});
