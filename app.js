import dotenv from 'dotenv';
import express from 'express';
import storageBodegas from './routers/bodegas.js';
console.clear();
dotenv.config();
const appExpress = express();
appExpress.use("/getBodegas", storageBodegas);
const config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>{console.log(`http://${config.hostname}:${config.port}`);})