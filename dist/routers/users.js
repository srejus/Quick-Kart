"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
exports.default = (router) => {
    router.get("/users", middlewares_1.isAuthenticated, users_1.listAllUsersAPI);
    router.put("/users/:id", middlewares_1.isAuthenticated, users_1.updateUserApi);
};
