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
exports.login = exports.register = void 0;
const users_1 = require("../db/users");
const helpers_1 = require("../helpers");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ error: "'username', 'password', 'email' are requried " });
        }
        const existingUser = yield (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exist!" });
        }
        const salt = (0, helpers_1.random)();
        const user = yield (0, users_1.createUser)({
            username,
            email,
            authentication: {
                salt,
                password: (0, helpers_1.authentication)(salt, password),
            },
        });
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "'email' and 'password' are required" });
        }
        const user = yield (0, users_1.getUserByEmail)(email).select('+authentication.salt +authentication.password');
        if (!user) {
            return res.status(400).json({ error: "Invalid email!" });
        }
        const expectedHsh = (0, helpers_1.authentication)(user.authentication.salt, password);
        console.log(expectedHsh);
        console.log(user);
        if (user.authentication.password !== expectedHsh) {
            return res.status(403).json("Invalid user!");
        }
        const salt = (0, helpers_1.random)();
        user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
        yield user.save();
        res.cookie('APP-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
        return res.status(200).json({ user }).end();
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.login = login;
