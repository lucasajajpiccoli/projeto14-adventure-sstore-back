import { Router } from 'express';

import { signUpMiddleware } from '../middlewares/authMiddleware.js';

import { createUser } from '../controllers/authController.js';

const authRouter = Router();

// authRouter.post('/login', _);

authRouter.post('/signup', signUpMiddleware, createUser);

export {
    authRouter
};