import express from 'express';
import * as pagesController from '../controllers/pagesController.js';
import { verifyToken } from '../utils/jwtMiddleware.js';

// Router setup
export const router = express.Router();

// Routes
router.get('/', pagesController.index);
router.get('/login', pagesController.login);
router.get('/register', pagesController.register);
router.get('/dashboard', verifyToken, pagesController.dashboard);