"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../controllers/cart");
exports.default = (router) => {
    router.get('/cart', cart_1.getUserCartApi);
    router.post('/cart/create', cart_1.addCartApi);
};
