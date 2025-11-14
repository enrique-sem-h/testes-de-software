import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    // verify token presence
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado!' });
    }

    // verify token validity
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Erro na verificação do token:', error);
        return res.status(403).json({ message: 'Erro na verificação do token!' });
    }

}