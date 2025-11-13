import express from 'express';
import * as authController from '../controllers/authController.js';

// Router setup
export const router = express.Router();

// Routes
router.post('/register', authController.register);