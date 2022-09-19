import { signUpSchema } from '../schemas/authSchema.js';
import { db } from '../database/db.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import { COLLECTIONS } from '../enums/collections.js';

async function signUpMiddleware (request, response, next) {
    const validation = signUpSchema.validate(request.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return response.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(errors);
    }

    try {
        const existentUser = await db.collection(COLLECTIONS.USERS)
            .findOne({ email: request.body.email });
        if (existentUser) {
            return response.sendStatus(STATUS_CODE.CONFLICT);
        }

        next();
    } catch (error) {
        console.error(error.message);
        response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}



export {
    signUpMiddleware
};