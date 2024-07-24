"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartItemByProduct = exports.deleteCart = exports.updateCart = exports.createCart = exports.addCart = exports.getCart = exports.CartModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product", requried: true },
    quantity: { type: Number, required: true }
});
exports.CartModel = mongoose_1.default.model("Cart", cartSchema);
const getCart = (userId) => exports.CartModel.find({ user: userId });
exports.getCart = getCart;
const addCart = (values) => exports.CartModel.insertMany(values);
exports.addCart = addCart;
const createCart = (values) => new exports.CartModel(values)
    .save().then((cart) => cart.toObject());
exports.createCart = createCart;
const updateCart = (id, values) => exports.CartModel.findByIdAndUpdate(id, values);
exports.updateCart = updateCart;
const deleteCart = (id) => exports.CartModel.findByIdAndDelete(id);
exports.deleteCart = deleteCart;
const getCartItemByProduct = (product, user) => exports.CartModel.find({ product, user });
exports.getCartItemByProduct = getCartItemByProduct;
