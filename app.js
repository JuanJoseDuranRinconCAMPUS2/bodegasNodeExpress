import dotenv from 'dotenv';
import express from 'express';
import storageBodegas from './routers/bodegas.js';
import postBodegas from './routers/postBodegas.js';
console.clear();
dotenv.config();
const appExpress = express();
appExpress.use("/getBodegas", storageBodegas);
appExpress.use("/postBodegas", postBodegas);
const config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>{console.log(`http://${config.hostname}:${config.port}`);})