import  express from 'express';
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import { validatePBodegas } from "../controller/validatePostBodegas.js";

const proxyPBodegas = express();
proxyPBodegas.use((req, res, next)=>{
    try {
        let data = plainToClass(validatePBodegas, req.body, {excludeExtraneousValues: true});
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

export default proxyPBodegas;