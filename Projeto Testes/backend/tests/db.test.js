import { jest, test } from '@jest/globals';
import * as db from "../db.js";

beforeEach(() => {
    jest.clearAllMocks();
});

describe('database functions', () => {

    test('getUsers retorna lista de usuários', async () => {
        const mockRows = [{ id: 1, name: 'Alice' }];
        db.pool.query = jest.fn().mockResolvedValue([mockRows]);

        const users = await db.getUsers();

        expect(db.pool.query).toHaveBeenCalledWith('SELECT * FROM users');
        expect(users).toEqual(mockRows);
    });

    test('getUser retorna um usuário específico', async () => {
        const mockUser = { id: 5, name: 'Bob' };
        db.pool.query = jest.fn().mockResolvedValueOnce([[mockUser]]);

        const user = await db.getUser(5);

        expect(db.pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE id = ?', [5]);
        expect(user).toEqual(mockUser);
    });

    test('createUser insere e retorna o usuário criado', async () => {
        const insertResult = { insertId: 10 };

        db.pool.query = jest.fn().mockResolvedValueOnce([insertResult]).mockResolvedValueOnce([[{ id: 10, name: 'Test', email: 'email@test.com' }]]);

        const user = await db.createUser('Test', 'email@test.com', 'pass');

        expect(db.pool.query).toHaveBeenNthCalledWith(1, 'INSERT IGNORE INTO users (name, email, password) VALUES (?, ?, ?)', ['Test', 'email@test.com', 'pass']);
        expect(user).toEqual({ id: 10, name: 'Test', email: 'email@test.com' });
    });

    test('deleteUser remove usuário e retorna undefined (pois getUser recebe id inexistente)', async () => {
        const result = { insertId: undefined };

        db.pool.query = jest.fn().mockResolvedValueOnce([result]).mockResolvedValueOnce([[]]);

        const deleted = await db.deleteUser(1);

        expect(db.pool.query).toHaveBeenNthCalledWith(1, 'DELETE FROM users WHERE id = ?', [1]);

        expect(deleted).toBeUndefined();
    });

    test('getMaterial retorna um material específico', async () => {
        const mockMaterial = { id: 3, title: 'PDF legal' };
        db.pool.query = jest.fn().mockResolvedValue([[mockMaterial]]);

        const material = await db.getMaterial(3);

        expect(db.pool.query).toHaveBeenCalledWith('SELECT * FROM materials WHERE id = ?', [3]);
        expect(material).toEqual(mockMaterial);
    });

    test('createMaterial insere material e retorna o registro', async () => {
        const insertResult = { insertId: 7 };
        const mockMaterial = { id: 7, title: 'Arquivo X' };

        db.pool.query = jest.fn().mockResolvedValueOnce([insertResult]).mockResolvedValueOnce([[mockMaterial]]);

        const material = await db.createMaterial(
            'Arquivo X',
            'descrição',
            'Matemática',
            'Avançado',
            'PDF',
            '/uploads/x.pdf',
            1,
            2048
        );

        expect(db.pool.query).toHaveBeenNthCalledWith(1, 'INSERT INTO materials (title, description, subject, level, type, file_path, author_id, size) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                'Arquivo X',
                'descrição',
                'Matemática',
                'Avançado',
                'PDF',
                '/uploads/x.pdf',
                1,
                2048
            ]
        );

        expect(material).toEqual(mockMaterial);
    });

    test('getAllMaterials retorna lista de materiiasi', async () => {
        const mockRows = [{ id: 1, title: 'Material 1', description: 'Desc1', subject: 'Matemática', level: "Ensino Fundamental", type: "Slides", file_path: "/path/do/arquivo", author_id: 1 }, { id: 2, title: 'Material 2', description: 'Desc1', subject: 'Física', level: "Ensino Médio", type: "Apostila", file_path: "/path/do/arquivo2", author_id: 1 }];
        db.pool.query = jest.fn().mockResolvedValue([mockRows]);

        const materials = await db.getAllMaterials();

        expect(db.pool.query).toHaveBeenCalledWith('SELECT * FROM materials');
        expect(materials).toEqual(mockRows);
    });

    test('getAllMaterialsWithAuthors retorna lista de materiais com nomes dos autores', async () => {
        const mockRows = [{ id: 1, title: 'Material 1', description: 'Desc1', subject: 'Matemática', level: "Ensino Fundamental", type: "Slides", file_path: "/path/do/arquivo", author_id: 1, author_name: 'Alice' }];
        const mockUser = { id: 1, name: 'Alice' };

        db.pool.query = jest.fn().mockResolvedValueOnce([[mockUser]]);

        db.pool.query = jest.fn().mockResolvedValue([mockRows]);

        const materials = await db.getAllMaterialsWithAuthors();

        expect(db.pool.query).toHaveBeenCalledWith('SELECT m.*, u.name AS author_name FROM materials AS m INNER JOIN users AS u ON m.author_id = u.id');
        expect(materials).toEqual(mockRows);
    });

});