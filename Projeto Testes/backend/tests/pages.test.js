import { jest } from "@jest/globals";

jest.unstable_mockModule("../db.js", () => ({
  getUser: jest.fn()  
}));

const { getUser } = await import("../db.js");
const { home, login, register, dashboard } = await import("../controllers/pagesController.js");

function mockResponse() {
  const res = {};
  res.render = jest.fn();
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

describe("Teste Unitário: pagesController", () => {
  
  it("deve renderizar a página inicial (login)", () => {
    const req = {};
    const res = mockResponse();

    home(req, res);
    expect(res.render).toHaveBeenCalledWith("login");
  });

  it("deve renderizar a página de login", () => {
    const req = {};
    const res = mockResponse();

    login(req, res);
    expect(res.render).toHaveBeenCalledWith("login");
  });

  it("deve renderizar a página de registro", () => {
    const req = {};
    const res = mockResponse();

    register(req, res);
    expect(res.render).toHaveBeenCalledWith("register");
  });

  it("deve retornar mensagem de boas-vindas no dashboard", async () => {
    const req = { user: { id: 1 } };
    const res = mockResponse();

    getUser.mockResolvedValue({
      id: 1,
      name: "Maria"
    });

    await dashboard(req, res);

    expect(getUser).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Welcome Maria");
  });

});
