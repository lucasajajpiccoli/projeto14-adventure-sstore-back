import { Router } from 'express';

import { signUpMiddleware } from '../middlewares/authMiddleware.js';

import { loginUser, createUser } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/login', loginUser);

authRouter.post('/signup', signUpMiddleware, createUser);

export {
    authRouter
};