import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { db } from '../database/db.js';
import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import { authLoginSchema } from '../schemas/authSchema.js';

export async function loginUser (request, response) {
   try{
      user = request.body;
      const validate = authLoginSchema.validate(user);

      if (validate.error) {
         return response.status(STATUS_CODE.BAD_REQUEST).send(validate.error.details[0].message);
      }     

      const userFound = await db.collection(COLLECTIONS.USERS).findOne({ email: user.email });
      
      if (!userFound) {
         return response.status(STATUS_CODE.NOT_FOUND).send('Email ou senha inválidos');
      }

      const decryptedPassword = bcrypt.compareSync(user.password, userFound.password);

      if(decryptedPassword) {
         const token = uuid();
         await db.collection('sessions').insertOne({token, userId: userFound._id});
         return response.status(STATUS_CODE.OK).send({token, name: userFound.name});
      }

      response.status(STATUS_CODE.NOT_FOUND).send('Email ou senha inválidos');
   }
   catch(error) {
      console.error('Erro ao logar usuário');
      response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
   }
}

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
