import  express from 'express';
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import { validatePostTransladarInv } from "../controller/validatePostTransladarInv.js";

const proxyPTransladarInv = express();
proxyPTransladarInv.use((req, res, next)=>{
    try {
        let data = plainToClass(validatePostTransladarInv, req.body, {excludeExtraneousValues: true});
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

export default proxyPTransladarInv;