import request from 'supertest';
import app from '../../app.js'; 
import * as db from '../../db.js';
import bcrypt from 'bcryptjs';
import { jest } from '@jest/globals';

// mock do banco
jest.mock('../../db.js');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Auth Integration Tests', () => {

    describe('POST /auth/register', () => {

        test('deve recusar campos vazios', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({ name: '', email: '', password: '', confirmPassword: '' });

            expect(res.status).toBe(200); 
            expect(res.text).toContain('Preencha todos os campos.');
        });

        test('deve recusar senhas diferentes', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({ 
                    name: 'John', 
                    email: 'john@test.com',
                    password: '123',
                    confirmPassword: '456'
                });

            expect(res.text).toContain('As senhas não coincidem.');
        });

        test('deve recusar email duplicado', async () => {
            db.pool.query = jest.fn().mockResolvedValue([[{ email: 'teste@test.com' }]]);

            const res = await request(app)
                .post('/auth/register')
                .send({
                    name: 'John',
                    email: 'teste@test.com',
                    password: '123',
                    confirmPassword: '123'
                });

            expect(res.text).toContain('E-mail já cadastrado');
        });

    });

    describe('POST /auth/login', () => {

        test('deve recusar campos vazios', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({ email: '', password: '' });

            expect(res.text).toContain('Preencha todos os campos.');
        });

        test('deve recusar usuário não encontrado', async () => {
            db.pool.query.mockResolvedValue([[]]); 

            const res = await request(app)
                .post('/auth/login')
                .send({ email: 'nao@existe.com', password: '123' });

            expect(res.text).toContain('Usuário não encontrado.');
        });

        test('deve recusar senha incorreta', async () => {
            db.pool.query.mockResolvedValue([[{
                id: 1,
                email: 'user@test.com',
                password: await bcrypt.hash('senhaCerta', 8)
            }]]);

            const res = await request(app)
                .post('/auth/login')
                .send({ email: 'user@test.com', password: 'errada' });

            expect(res.text).toContain('Senha incorreta.');
        });

        test('deve autenticar e definir cookie', async () => {
            const hashed = await bcrypt.hash('123456', 8);

            db.pool.query.mockResolvedValue([[{
                id: 1,
                email: 'user@test.com',
                password: hashed
            }]]);

            const res = await request(app)
                .post('/auth/login')
                .send({ email: 'user@test.com', password: '123456' });

            expect(res.status).toBe(302);
            expect(res.headers['set-cookie']).toBeDefined();
            expect(res.headers.location).toBe('/dashboard');
        });
    });

});