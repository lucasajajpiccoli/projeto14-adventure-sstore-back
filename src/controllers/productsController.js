import { db } from '../database/db.js';
import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function readAllProducts (request, response) {
    try {
        const products = await db.collection(COLLECTIONS.PRODUCTS).find().toArray();
        response.send(products);
    } catch (error) {
        console.error(error.message);
        response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

function readCategorizedProducts (request, response) {
    const { products, nameCategory } = response.locals;
    const categorizedProducts = products.filter(product => product.category === nameCategory);
    response.send(categorizedProducts);
}

function readSpecificProduct (request, response) {
    const { product } = response.locals;
    response.send(product);
}

async function readCategories (request, response) {
    try {
        const products = await db.collection(COLLECTIONS.PRODUCTS).find().toArray();
        const duplicatedCategories = products.map(product => product.category);
        const categories = [...new Set(duplicatedCategories)];
        response.send(categories);
    } catch (error) {
        console.error(error.message);
        response.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

export {
    readAllProducts,
    readCategorizedProducts,
    readSpecificProduct,
    readCategories
};