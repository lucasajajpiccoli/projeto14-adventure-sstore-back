import { Router } from 'express';

import {
    authenticationMiddleware,
    existentProductMiddleware,
    createExistentProductInCartMiddleware,
    deleteExistentProductInCartMiddleware
} from '../middlewares/cartMiddleware.js';

import {
    readCart,
    insertCartProduct,
    deleteCartProduct
} from '../controllers/cartController.js';

const cartRouter = Router();

cartRouter.get('/cart',
    authenticationMiddleware,
    readCart
);

cartRouter.post('/cart/:idProduct',
    authenticationMiddleware,
    existentProductMiddleware,
    createExistentProductInCartMiddleware,
    insertCartProduct
);

cartRouter.delete('/cart/:idProduct',
    authenticationMiddleware,
    existentProductMiddleware,
    deleteExistentProductInCartMiddleware,
    deleteCartProduct
);

export {
    cartRouter
};