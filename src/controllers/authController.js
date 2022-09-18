import bcrypt from 'bcrypt';

import { db } from '../database/db.js';
import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function createUser (request, response) {
    const { name, email } = request.body;
    const password = bcrypt.hashSync(request.body.password, 10);

     try {
        await db.collection(COLLECTIONS.USERS).insertOne({ name, email, password });
        response.sendStatus(STATUS_CODE.CREATED);    
     } catch (error) {
        response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
     }
}

export {
    createUser
};