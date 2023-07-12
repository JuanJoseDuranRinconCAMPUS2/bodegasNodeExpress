import  express from 'express';
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import { validatePostProductosInv } from "../controller/validatePostProductosInv.js";

const proxyPProductsInv = express();
proxyPProductsInv.use((req, res, next)=>{
    try {
        let data = plainToClass(validatePostProductosInv, req.body, {excludeExtraneousValues: true});
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

export default proxyPProductsInv;