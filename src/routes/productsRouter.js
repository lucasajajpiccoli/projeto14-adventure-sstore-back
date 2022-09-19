import { Router } from 'express';

import {
    categorizedProductsMiddleware,
    specificProductMiddleware
} from '../middlewares/productsMiddleware.js';

import {
    readAllProducts,
    readCategorizedProducts,
    readSpecificProduct,
    readCategories
} from '../controllers/productsController.js';

const productsRouter = Router();

productsRouter.get('/products',
    readAllProducts
);

productsRouter.get('/products/category/:nameCategory',
    categorizedProductsMiddleware,
    readCategorizedProducts
);

productsRouter.get('/products/product/:idProduct',
    specificProductMiddleware,
    readSpecificProduct
);

productsRouter.get('/products/categories',
    readCategories
);

export {
    productsRouter
};