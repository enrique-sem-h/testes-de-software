import bcrypt from 'bcryptjs';
import * as db from '../db.js';

export const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'As senhas não coincidem.' });
    }
    
    try {
        const [existingUser] = await db.pool.query('SELECT email FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'E-mail já cadastrado.' }); 
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        await db.createUser(name, email, hashedPassword);
        
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ message: 'Erro interno ao registrar usuário.' });
    }
};
