"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserBySessionToken = exports.getUserByEmail = exports.getUserById = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, requried: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
const getUsers = () => exports.UserModel.find();
exports.getUsers = getUsers;
const getUserById = (id) => exports.UserModel.findById(id);
exports.getUserById = getUserById;
const getUserByEmail = (email) => exports.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = (sessionToken) => exports.UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});
exports.getUserBySessionToken = getUserBySessionToken;
const createUser = (values) => new exports.UserModel(values)
    .save().then((user) => user.toObject());
exports.createUser = createUser;
