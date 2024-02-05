import express from "express";
import rateLimit from "express-rate-limit"; //ver si esta importado
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { port } from './config.js';
import { connectionDB } from './db.js';
import userRoutes from '../server/routes/userRoutes.js';
import boardsRoutes from '../server/routes/boardsRoutes.js';

const app = express();
connectionDB();

//settings
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


//middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: '/images'
}))
app.use(morgan('tiny'));
app.use(limiter);
app.use(cors({
    origin:'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
    req.setTimeout(10000); // Set request timeout to 5 seconds
    res.setTimeout(10000); // Set response timeout to 5 seconds
    next();
});

//routes
app.use(userRoutes);
app.use(boardsRoutes);

//listen
const server = app.listen(port, console.log("connected to port: ", port));

server.keepAliveTimeout = 30 * 1000;
server.headersTimeout = 35 * 1000;