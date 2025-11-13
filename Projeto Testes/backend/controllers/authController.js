import bcrypt from 'bcryptjs';
import * as db from '../db.js';

export const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return console.log('Passwords do not match');
    }
    else {
        const hashedPassword = await bcrypt.hash(password, 8);
        await db.createUser(name, email, hashedPassword);
        res.status(201).send('User registered successfully');
    }
};