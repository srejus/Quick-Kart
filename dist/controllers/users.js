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
exports.updateUserApi = exports.listAllUsersAPI = void 0;
const users_1 = require("../db/users");
const listAllUsersAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, users_1.getUsers)();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.listAllUsersAPI = listAllUsersAPI;
// get sessionToken to update current user without accepting id
const updateUserApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const user = yield (0, users_1.updateUser)(id, data);
        return res.status(200).json({ message: "User Updated!" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.updateUserApi = updateUserApi;
