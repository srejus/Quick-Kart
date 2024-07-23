"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../controllers/products");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
exports.default = (router) => {
    router.get('/products', products_1.listProductsApi);
    router.get('/products/:id', products_1.getSingleProductApi);
    router.post('/products/create', middlewares_1.isAuthenticated, products_1.createProductApi);
    router.put('/products/:id', middlewares_1.isAuthenticated, products_1.updateProductApi);
    router.delete('/products/:id', middlewares_1.isAuthenticated, products_1.deleteProductApi);
};
