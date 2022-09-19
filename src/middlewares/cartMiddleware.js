import { response } from 'express';
import { ObjectId } from 'mongodb';

import { db } from '../database/db.js'
import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function authenticationMiddleware(request, response, next) {
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return response.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    try {
        const session = await db.collection(COLLECTIONS.SESSIONS).findOne({ token });
        if (!session) {
            return response.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        const { userId } = session;
        response.locals = { userId };
        next();
    } catch (error) {
        console.error(error.message);
        response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

async function existentProductMiddleware(request, response, next) {
    const { idProduct } = request.params;
    try {
        const product = await db.collection(COLLECTIONS.PRODUCTS)
            .findOne({ _id: ObjectId(idProduct) });
        if (!product) {
            return response.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        response.locals = { ...response.locals, product };
        next();
    } catch (error) {
        console.error(error.message);
        response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

async function existentProductInCart(userId, product) {
    try {
        const cartProduct = await db.collection(COLLECTIONS.CART_PRODUCTS)
            .findOne({ userId, productId: product._id });
        return cartProduct;
    } catch (error) {
        console.error(error.message);
        return response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

async function createExistentProductInCartMiddleware(request, response, next) {
    const { userId, product } = response.locals;
    try {
        const cartProduct = await existentProductInCart(userId, product);
        if (cartProduct) {
            return response.sendStatus(STATUS_CODE.CONFLICT);
        }

        next();
    } catch (error) {
        console.error(error.message);
        response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

async function deleteExistentProductInCartMiddleware(request, response, next) {
    const { userId, product } = response.locals;
    try {
        const cartProduct = await existentProductInCart(userId, product);
        if (!cartProduct) {
            return response.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        response.locals = {...response.locals, cartProduct};
        next();
    } catch (error) {
        console.error(error.message);
        response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

export {
    authenticationMiddleware,
    existentProductMiddleware,
    createExistentProductInCartMiddleware,
    deleteExistentProductInCartMiddleware
};