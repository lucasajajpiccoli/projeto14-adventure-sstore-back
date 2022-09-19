import express from 'express';
import cors from 'cors';

import { v4 as uuid } from 'uuid';

import { authRouter } from './routes/authRouter.js';
import { productsRouter } from './routes/productsRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(productsRouter);

export {
    app
};