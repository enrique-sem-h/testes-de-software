import { jest } from '@jest/globals';
import bcrypt from "bcryptjs";
import { pool } from "../../db.js";

process.env.JWT_SECRET = "teste123";

import { login } from "../../controllers/authController.js";

function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}


describe("Teste Unitário: Login", () => {

  it("deve falhar quando o usuário não existe", async () => {
    pool.query = jest.fn().mockResolvedValue([[]]);

    const req = {
      body: { email: "naoexiste@example.com", password: "123456" }
    };

    const res = mockResponse();
    await login(req, res);

    expect(res.render).toHaveBeenCalled();
  });

  it("deve falhar quando a senha estiver incorreta", async () => {
    pool.query = jest.fn().mockResolvedValue([[{
      email: "teste@example.com",
      password: "hashed"
    }]]);

    bcrypt.compare = jest.fn().mockResolvedValue(false);

    const req = {
      body: { email: "teste@example.com", password: "errada" }
    };

    const res = mockResponse();
    await login(req, res);

    expect(res.render).toHaveBeenCalled();
  });

  it("deve fazer login com sucesso", async () => {
    pool.query = jest.fn().mockResolvedValue([[{
      id: 1,
      email: "teste@example.com",
      password: "hashedSenha"
    }]]);

    bcrypt.compare = jest.fn().mockResolvedValue(true);

    const req = {
      body: { email: "teste@example.com", password: "123456" }
    };

    const res = mockResponse();
    await login(req, res);

    expect(res.redirect).toHaveBeenCalledWith("/dashboard");
  });

});
