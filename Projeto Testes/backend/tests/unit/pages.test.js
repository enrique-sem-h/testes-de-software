import { jest } from "@jest/globals";

jest.unstable_mockModule("../../db.js", () => ({
  getUser: jest.fn(),
  getAllMaterialsWithAuthors: jest.fn()
}));

const { getUser, getAllMaterialsWithAuthors } = await import("../../db.js");
const { index, login, register, dashboard } = await import("../../controllers/pagesController.js");

function mockResponse() {
  const res = {};
  res.render = jest.fn();
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

describe("Teste Unitário: pagesController", () => {

  it("deve renderizar a página inicial (index)", () => {
    const req = {};
    const res = mockResponse();

    index(req, res);
    expect(res.render).toHaveBeenCalledWith("index");
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

  it("deve renderizar a página do dashboard com o usuário", async () => {
    const req = { user: { id: 1 } };
    const res = mockResponse();

    getUser.mockResolvedValue({
      id: 1,
      name: "Maria"
    });

    getAllMaterialsWithAuthors.mockResolvedValue([]);

    await dashboard(req, res);

    expect(getUser).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.render).toHaveBeenCalledWith("dashboard", { user: { id: 1, name: "Maria" }, materials: [] });
  });

});
