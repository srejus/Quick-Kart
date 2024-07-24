"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get("/users", middlewares_1.isAuthenticated, users_1.listAllUsersAPI);
    router.put("/users/:id", middlewares_1.isAuthenticated, users_1.updateUserApi);
};
