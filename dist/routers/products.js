"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../controllers/products");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get('/products', products_1.listProductsApi);
    router.get('/products/:id', products_1.getSingleProductApi);
    router.post('/products/create', middlewares_1.isAuthenticated, products_1.createProductApi);
    router.put('/products/:id', middlewares_1.isAuthenticated, products_1.updateProductApi);
    router.delete('/products/:id', middlewares_1.isAuthenticated, products_1.deleteProductApi);
};
