import express from 'express';
import * as pagesController from '../controllers/pagesController.js';

// Router setup
export const router = express.Router();

// Routes
router.get('/', pagesController.home);
router.get('/login', pagesController.login);
router.get('/register', pagesController.register);