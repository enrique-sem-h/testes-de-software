import fetch from "node-fetch";

const BASE_URL = "http://localhost:3000";

describe("Testes simulando carga (versão Jest)", () => {
  
  test("1 - status válido", async () => {
    const res = await fetch(`${BASE_URL}/`);
    expect(res.status).toBe(200);
  });

  test("2 - sem crash (não retorna 500)", async () => {
    const res = await fetch(`${BASE_URL}/`);
    expect(res.status).not.toBe(500);
  });

  test("3 - resposta < 1.2s", async () => {
    const start = Date.now();
    const res = await fetch(`${BASE_URL}/`);
    await res.text();
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(1200);
  });

  test("4 - suporta alto volume (100 req)", async () => {
    const requests = Array.from({ length: 100 }).map(() => fetch(`${BASE_URL}/`));
    const results = await Promise.all(requests);

    const allOK = results.every(r => r.status === 200);
    expect(allOK).toBe(true);
  });

  test("5 - HTML retornado", async () => {
    const res = await fetch(`${BASE_URL}/`);
    const body = await res.text();
    expect(body.length).toBeGreaterThan(0);
  });

  test("6 - servidor recuperou (requisições consecutivas)", async () => {
    let ok = true;

    for (let i = 0; i < 50; i++) {
      const res = await fetch(`${BASE_URL}/`);
      if (res.status !== 200) ok = false;
    }

    expect(ok).toBe(true);
  });

});


