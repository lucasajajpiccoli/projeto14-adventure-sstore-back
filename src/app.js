import express from 'express';
import cors from 'cors';
import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import './setup.js';
import { db } from './database/db.js';

const app = express();
app.use(cors());
app.use(express.json());

export {
    app
};