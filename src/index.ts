import express from 'express';
import http from 'http';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routers from './routers';

const app = express();
dotenv.config();

app.use(cors({
    credentials:true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log("Server is listening on port "+process.env.port);
});

mongoose.Promise = Promise;
const DB_URL:string = process.env.DB_URL ? process.env.DB_URL : "";
mongoose.connect(DB_URL);

mongoose.connection.on('error', (error: Error) => console.log("Error on DB Connection"));

app.use("/",routers);