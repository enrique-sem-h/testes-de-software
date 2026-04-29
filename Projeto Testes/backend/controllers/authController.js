import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as db from '../db.js';
import { error } from 'console';

export const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    
    // validating input fields
    if (!name || !email || !password || !confirmPassword) {
        const error = 'Preencha todos os campos.';
        return res.render('register', { error : error, name, email, password, confirmPassword });
    }

    //  validating passwords match
    if (password !== confirmPassword) {
        const error = 'As senhas não coincidem.';
        return res.render('register', { error : error, name, email });
    }
    
    // registering user
    try {
        const [existingUser] = await db.pool.query('SELECT email FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            const error = 'E-mail já cadastrado. <a href="/login">Fazer login</a>';
            return res.render('register', { error : error, name, password, confirmPassword});
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        await db.createUser(name, email, hashedPassword);
        
        // redirect to dashboard after successful registration
        res.status(201).redirect('/login');
        
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ message: 'Erro interno ao registrar usuário.' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // validating email and password
    if (!email || !password) {
        const error = 'Preencha todos os campos.';
        return res.render('login', { error : error, email, password });
    }

    try {
        // selecting user from database
        const [users] = await db.pool.query('SELECT * FROM users WHERE email = ?', [email]);

        // if user not found
        if (users.length === 0) {
            const error = 'Usuário não encontrado.';
            return res.render('login', { error: error, email, password });
        }

        const user = users[0];
        
        // validating if password matches
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            const error = 'Senha incorreta.';
            res.render('login', { error: error, email })
        } else {
            // generating jwt token
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
            res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 }); // change secure to true in production
            res.status(200).redirect('/dashboard');
        }

    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro interno ao fazer login.' });
    }

}