// import * as db from '../../db.js';
// import mysql from 'mysql2/promise';

// let conn;

// beforeAll(async () => {
//     conn = await mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME
//     });
// });

// beforeEach(async () => {
//     await conn.query('SET FOREIGN_KEY_CHECKS = 0');
//     await conn.query('TRUNCATE TABLE materials');
//     await conn.query('TRUNCATE TABLE users');
//     await conn.query('SET FOREIGN_KEY_CHECKS = 1');
//     await conn.beginTransaction();
// });

// afterEach(async () => {
//     await conn.rollback();
// });

// afterAll(async () => {
//     await conn.end();
// });

// describe('Integração — Materials', () => {


//     // 1. criação de material
//     it('deve criar um material corretamente', async () => {
//         const user = await db.createUser('Autor', 'a@a.com', '123');

//         const material = await db.createMaterial(
//             'PDF Teste',
//             'Descrição opcional',
//             'História',
//             'Ensino Médio',
//             'Slides',
//             '/uploads/teste.pdf',
//             user.id,
//             5000
//         );

//         expect(material).toBeDefined();
//         expect(material.title).toBe('PDF Teste');
//         expect(material.subject).toBe('História');
//         expect(material.author_id).toBe(user.id);
//     });

//     // 2. descrição vazia deve virar string vazia
//     it('deve criar material com descrição vazia quando não enviada', async () => {
//         const user = await db.createUser('Autor', 'a@a.com', '123');

//         const material = await db.createMaterial(
//             'Sem Descrição',
//             undefined, // <-- o controller preenche com ''
//             'Português',
//             'Ensino Fundamental',
//             'Resumo',
//             '/uploads/img.png',
//             user.id,
//             1024
//         );

//         expect(material.description).toBe(''); // regra definida no código
//     });

//     // 3. buscar material por ID
//     it('deve retornar um material pelo ID', async () => {
//         const user = await db.createUser('Autor', 'a@a.com', '123');

//         const created = await db.createMaterial(
//             'Doc X',
//             'Desc X',
//             'Física',
//             'Ensino Médio',
//             'Slides',
//             '/docs/x.pdf',
//             user.id,
//             2048
//         );

//         const fetched = await db.getMaterial(created.id);

//         expect(created.id).toBe(fetched.id);
//         expect(fetched.title).toBe('Doc X');
//     });

//     // 4. listar todos os materiais
//     it('deve retornar todos os materiais criados', async () => {
//         const user = await db.createUser('Autor', 'a@a.com', '123');

//         await db.createMaterial('Mat1', 'Desc1', 'Matemática', 'Ensino Médio', 'Slides', '/m1', user.id, 100);
//         await db.createMaterial('Mat2', 'Desc2', 'Fisica', 'Ensino Superior', 'Slides', '/m2', user.id, 200);

//         const materials = await db.getAllMaterials();

//         expect(materials.length).toBe(2);
//         expect(materials.map(m => m.title)).toContain('Mat1');
//         expect(materials.map(m => m.title)).toContain('Mat2');
//     });

//     // 5. listar materiais com nome do autor (JOIN)
//     it('deve retornar materiais com o campo author_name via JOIN', async () => {
//         const author = await db.createUser('Professor Y', 'y@y.com', '123');

//         await db.createMaterial(
//             'Material Avançado',
//             'Descrição Teste',
//             'Física',
//             'Ensino Superior',
//             'Anotações',
//             '/material.pdf',
//             author.id,
//             3000
//         );

//         const list = await db.getAllMaterialsWithAuthors();

//         expect(list.length).toBe(1);
//         expect(list[0].title).toBe('Material Avançado');
//         expect(list[0].author_name).toBe('Professor Y');
//     });

//     // 6. garantir integridade: material com author_id inexistente deve falhar
//     it('não deve criar material com author_id inexistente (FK)', async () => {
//         let error = null;

//         try {
//             // tenta criar material com FK inválida
//             await db.createMaterial(
//                 'Erro',
//                 'Vai quebrar',
//                 'Arte',
//                 '1',
//                 'PDF',
//                 '/erro.pdf',
//                 999999, // ID inexistente
//                 123
//             );
//         } catch (err) {
//             error = err;
//         }

//         expect(error).toBeTruthy();
//         expect(error.code).toBeDefined(); // geralmente 'ER_NO_REFERENCED_ROW_2'
//     });

// });