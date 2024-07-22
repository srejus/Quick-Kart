"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
const server = http_1.default.createServer(app);
server.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.port);
});
mongoose_1.default.Promise = Promise;
const DB_URL = process.env.DB_URL ? process.env.DB_URL : "";
mongoose_1.default.connect(DB_URL);
mongoose_1.default.connection.on('error', (error) => console.log("Error on DB Connection"));
