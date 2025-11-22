import fetch from "node-fetch";

const BASE_URL = "http://localhost:3000/login";

describe("Testes equivalentes ao k6 (versão Jest)", () => {

  test("1 - status 200", async () => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "lucas@test.com",
        senha: "123456"
      })
    });

    expect(res.status).toBe(200);
  });

  test("2 - resposta < 500ms", async () => {
    const start = Date.now();

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "lucas@test.com",
        senha: "123456"
      })
    });
    await res.text();

    const duration = Date.now() - start;
    expect(duration).toBeLessThan(500);
  });

  test("3 - JSON válido", async () => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "lucas@test.com",
        senha: "123456"
      })
    });

    const data = await res.json();
    expect(typeof data).toBe("object");
  });

  test("4 - contém token", async () => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "lucas@test.com",
        senha: "123456"
      })
    });

    const data = await res.json();
    expect(data.token).toBeDefined();
  });

  test("5 - header correto", async () => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "lucas@test.com",
        senha: "123456"
      })
    });

    expect(res.headers.get("content-type")).toMatch(/json/i);
  });

  test("6 - nenhuma falha", async () => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "lucas@test.com",
        senha: "123456"
      })
    });

    // Se chegou aqui sem exceção, o teste passa
    expect(res).toBeTruthy();
  });

});

