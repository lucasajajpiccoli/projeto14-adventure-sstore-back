import { ObjectId } from 'mongodb';

import { db } from '../database/db.js';
import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function categorizedProductsMiddleware (request, response, next) {
    const { nameCategory } = request.params;
    try {
        const products = await db.collection(COLLECTIONS.PRODUCTS).find().toArray();
        const isThereCategory = products.map(product => product.category).includes(nameCategory);
        if (!isThereCategory) {
            return response.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        response.locals = { products, nameCategory };
        next();
    } catch (error) {
        console.error(error.message);
        response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

async function specificProductMiddleware (request, response, next) {
    const { idProduct } = request.params;
    try {
        const product = await db.collection(COLLECTIONS.PRODUCTS).findOne( {_id: ObjectId(idProduct) });
        if (!product) {
            return response.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        response.locals = { product };
        next();
    } catch (error) {
        console.error(error.message);
        response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

export {
    categorizedProductsMiddleware,
    specificProductMiddleware
};