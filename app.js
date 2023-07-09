import dotenv from 'dotenv';
import express from 'express';
import storageBodegas from './routers/bodegas.js';
import postBodegas from './routers/postBodegas.js';
import storageGetProductosT from './routers/getProductosT.js';
import postProductosInv from './routers/postProductosInv.js';
import postInventarios from './routers/postInventarios.js';
console.clear();
dotenv.config();
const appExpress = express();
appExpress.use("/getBodegas", storageBodegas);
appExpress.use("/postBodegas", postBodegas);
appExpress.use("/getProductosT", storageGetProductosT);
appExpress.use("/postProductosInv", postProductosInv);
appExpress.use("/postInventarios", postInventarios); 

const config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>{console.log(`http://${config.hostname}:${config.port}`);})