"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductApi = exports.updateProductApi = exports.createProductApi = exports.getSingleProductApi = exports.listProductsApi = void 0;
const products_1 = require("../db/products");
const listProductsApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, products_1.getProducts)();
        return res.status(200).json(products);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.listProductsApi = listProductsApi;
const getSingleProductApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield (0, products_1.getProductById)(id);
        return res.status(200).json(product);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getSingleProductApi = getSingleProductApi;
const createProductApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (!data.product_name || !data.product_img || !data.price) {
            return res.status(400).json({ error: "'product_name', 'product_img' and 'price' are required" });
        }
        const product = yield (0, products_1.createProduct)(data);
        return res.status(201).json(product);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.createProductApi = createProductApi;
const updateProductApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const product = yield (0, products_1.updateProduct)(id, data);
        return res.status(200).json({ message: "Product updated successfully!" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.updateProductApi = updateProductApi;
const deleteProductApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield (0, products_1.deleteProduct)(id);
        return res.status(200).json({ message: "product deleted successfully!" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.deleteProductApi = deleteProductApi;
