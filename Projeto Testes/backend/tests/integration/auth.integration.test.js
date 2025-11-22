import request from "supertest";
import app from "../../backend/utils/app.js";

describe("Integração - AUTH", () => {

  // 1
  test("POST /register deve criar usuário", async () => {
    const res = await request(app)
      .post("/register")
      .send({ nome: "Lucas", email: "lucas@test.com", senha: "123456" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  // 2
  test("POST /register deve recusar e-mail duplicado", async () => {
    const res = await request(app)
      .post("/register")
      .send({ nome: "Lucas", email: "lucas@test.com", senha: "123456" });

    expect(res.status).toBe(409);
  });

  // 3
  test("POST /register deve recusar cadastro incompleto", async () => {
    const res = await request(app)
      .post("/register")
      .send({ email: "", senha: "" });

    expect(res.status).toBe(400);
  });

  // 4
  test("POST /login deve logar com credenciais corretas", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "lucas@test.com", senha: "123456" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  // 5
  test("POST /login deve recusar senha errada", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "lucas@test.com", senha: "errada" });

    expect(res.status).toBe(401);
  });

  // 6
  test("POST /login deve recusar usuário inexistente", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "fake@fake.com", senha: "123456" });

    expect(res.status).toBe(404);
  });

});
