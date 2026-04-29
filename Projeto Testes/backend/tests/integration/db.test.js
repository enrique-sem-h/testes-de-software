// // tests/integration/db.test.js
// import * as db from '../../db.js';
// import mysql from 'mysql2/promise';

// let connection;

// beforeAll(async () => {
//     // conexão direta para limpar tabelas
//     connection = await mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME
//     });
// });

// beforeEach(async () => {
//     // limpa tudo antes de cada teste
//     await connection.query('DELETE FROM materials');
//     await connection.query('DELETE FROM users');
// });

// afterAll(async () => {
//     await connection.end();
//     db.pool.end();
// });

// describe('Testes de Integração do Banco de Dados', () => {

//     // ------------------ USERS ---------------------

//     it('deve criar um usuário e retorná-lo corretamente', async () => {
//         const user = await db.createUser(
//             'Enrique',
//             'test@example.com',
//             '123456'
//         );

//         expect(user).toBeDefined();
//         expect(user.name).toBe('Enrique');
//         expect(user.email).toBe('test@example.com');
//     });

//     it('deve retornar todos os usuários criados', async () => {
//         await db.createUser('Alice', 'alice@example.com', '123');
//         await db.createUser('Bob', 'bob@example.com', '456');

//         const users = await db.getUsers();

//         expect(users.length).toBe(2);
//         expect(users.map(u => u.name)).toContain('Alice');
//         expect(users.map(u => u.name)).toContain('Bob');
//     });

//     it('deve buscar um usuário pelo ID', async () => {
//         const user = await db.createUser('Test', 't@t.com', '123');

//         const found = await db.getUser(user.id);

//         expect(found).toBeDefined();
//         expect(found.email).toBe('t@t.com');
//     });

//     it('deve deletar um usuário corretamente', async () => {
//         const user = await db.createUser('ToDelete', 'del@test.com', '123');

//         await db.deleteUser(user.id);

//         const afterDelete = await db.getUser(user.id);

//         expect(afterDelete).toBeUndefined();
//     });

//     // ------------------ MATERIALS ---------------------

//     it('deve criar um material e retorná-lo corretamente', async () => {
//         const user = await db.createUser('Author', 'a@a.com', '123');

//         const material = await db.createMaterial(
//             'Apostila',
//             'Material de teste',
//             'Matemática',
//             'Ensino Médio',
//             'Slides',
//             '/uploads/teste.pdf',
//             user.id,
//             12345
//         );

//         expect(material).toBeDefined();
//         expect(material.title).toBe('Apostila');
//         expect(material.subject).toBe('Matemática');
//         expect(material.author_id).toBe(user.id);
//     });

//     it('deve retornar todos os materiais criados', async () => {
//         const user = await db.createUser('User', 'u@u.com', '123');

//         await db.createMaterial('Arq1', 'Desc1', 'Port', 'Ensino Fundamental', 'Exercícios', '/a', user.id, 100);
//         await db.createMaterial('Arq2', 'Desc2', 'Mat', 'Ensino Fundamental', 'Apostila', '/b', user.id, 200);

//         const materials = await db.getAllMaterials();

//         expect(materials.length).toBe(2);
//         expect(materials.map(m => m.title)).toContain('Arq1');
//         expect(materials.map(m => m.title)).toContain('Arq2');
//     });

//     it('deve retornar materiais com nome do autor (JOIN)', async () => {
//         const author = await db.createUser('Professor X', 'px@x.com', '123');

//         await db.createMaterial(
//             'Conteúdo X',
//             'Descrição',
//             'Física',
//             'Ensino Superior',
//             'Slides',
//             '/cont-x',
//             author.id,
//             500
//         );

//         const results = await db.getAllMaterialsWithAuthors();

//         expect(results.length).toBe(1);
//         expect(results[0].author_name).toBe('Professor X');
//         expect(results[0].title).toBe('Conteúdo X');
//     });

// });