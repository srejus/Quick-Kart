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
exports.addCartApi = exports.getUserCartApi = void 0;
const cart_1 = require("../db/cart");
const users_1 = require("../db/users");
const getUserCartApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionToken = req.cookies['APP-AUTH'];
        const user = yield (0, users_1.getUserBySessionToken)(sessionToken);
        if (!user) {
            return res.status(400).json({ error: "Invalid User" });
        }
        const cartItems = yield (0, cart_1.getCart)(user);
        return res.status(200).json(cartItems);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getUserCartApi = getUserCartApi;
const addCartApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const sessionToken = req.cookies['APP-AUTH'];
        const user = yield (0, users_1.getUserBySessionToken)(sessionToken);
        const existingObject = yield (0, cart_1.getCartItemByProduct)(req.body.product, user._id);
        console.log(existingObject);
        if (!user) {
            return res.status(400).json({ error: "Invalid User" });
        }
        const cartItems = data.map(item => (Object.assign(Object.assign({}, item), { user: user })));
        const cart = (0, cart_1.addCart)(cartItems);
        return res.status(201).json({ message: "Cart objects created!" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.addCartApi = addCartApi;
