"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    product_name: { type: String, requried: true },
    product_img: { type: String, required: true },
    price: { type: Number, requried: true }
});
exports.ProductModel = mongoose_1.default.model("Product", productSchema);
const getProducts = () => exports.ProductModel.find();
exports.getProducts = getProducts;
const getProductById = (id) => exports.ProductModel.findById(id);
exports.getProductById = getProductById;
const createProduct = (values) => new exports.ProductModel(values)
    .save().then((product) => product.toObject());
exports.createProduct = createProduct;
const updateProduct = (id, values) => exports.ProductModel.findByIdAndUpdate(id, values);
exports.updateProduct = updateProduct;
const deleteProduct = (id) => exports.ProductModel.findByIdAndDelete(id);
exports.deleteProduct = deleteProduct;
