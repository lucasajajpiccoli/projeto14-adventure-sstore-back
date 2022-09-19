import { ObjectId } from 'mongodb';

import { db } from '../database/db.js';
import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function readCart(request, response) {
    const { userId } = response.locals;
    try {
        const cart = await db.collection(COLLECTIONS.CART_PRODUCTS)
            .find({ userId }).toArray();
        response.send(cart);
    } catch (error) {
        console.error(error.message);
        response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

async function insertCartProduct(request, response) {
    const { userId, product } = response.locals;
    const cartProduct = {
        userId,
        productId: product._id,
        name: product.name,
        category: product.category
    };
    try {
        await db.collection(COLLECTIONS.CART_PRODUCTS).insertOne(cartProduct);
        response.sendStatus(200);
    } catch (error) {
        console.error(error.message);
        response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

async function deleteCartProduct(request, response) {
    const { cartProduct } = response.locals;
    try {
        await db.collection(COLLECTIONS.CART_PRODUCTS).deleteOne({ _id: cartProduct._id });
    } catch (error) {
        console.error(error.message);
        response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

export {
    readCart,
    insertCartProduct,
    deleteCartProduct
}