// import request from "supertest";
// import fs from "fs";
// import path from "path";
// import app from "../../app.js";

// const TEST_UPLOADS_DIR = path.join(process.cwd(), "test_uploads");

// beforeAll(() => {
//     if (!fs.existsSync(TEST_UPLOADS_DIR)) {
//         fs.mkdirSync(TEST_UPLOADS_DIR);
//     }
// });

// afterEach(() => {
//     const files = fs.readdirSync(TEST_UPLOADS_DIR);
//     for (const file of files) {
//         fs.unlinkSync(path.join(TEST_UPLOADS_DIR, file));
//     }
// });

// describe("POST /materials/upload", () => {
//     test("should upload a file successfully", async () => {
//         const filePath = path.join(TEST_UPLOADS_DIR, "sample.txt");
//         fs.writeFileSync(filePath, "hello world");

//         const response = await request(app)
//             .post("/materials/upload")
//             .attach("materialFile", filePath);

//         expect(response.status).toBe(200);
//         expect(response.body.success).toBe(true);
//         expect(response.body.filename).toBeDefined();

//         // garante que o arquivo realmente foi salvo fisicamente
//         const savedFile = path.join("uploads/materials", response.body.filename);
//         expect(fs.existsSync(savedFile)).toBe(true);
//     });

//     test("should fail when file is missing", async () => {
//         const response = await request(app)
//             .post("/materials/upload");

//         expect(response.status).toBe(400); // ajuste para o seu caso real
//         expect(response.body.error).toBeDefined();
//     });

//     test("should reject unsupported file types", async () => {
//         const filePath = path.join(TEST_UPLOADS_DIR, "test.exe");
//         fs.writeFileSync(filePath, "dummy exe");

//         const response = await request(app)
//             .post("/materials/upload")
//             .attach("materialFile", filePath);

//         expect(response.status).toBe(415);
//         expect(response.body.error).toContain("tipo de arquivo");
//     });

//     test("should enforce file size limits", async () => {
//         const filePath = path.join(TEST_UPLOADS_DIR, "bigfile.txt");

//         // cria arquivo de 10 MB
//         fs.writeFileSync(filePath, Buffer.alloc(10 * 1024 * 1024));

//         const response = await request(app)
//             .post("/materials/upload")
//             .attach("materialFile", filePath);

//         expect(response.status).toBe(413);
//         expect(response.body.error).toContain("tamanho");
//     });
// });