import  express from 'express';
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import { validatePostInventarios } from "../controller/validatePostInventarios.js";

const proxyPInventarios = express();
proxyPInventarios.use((req, res, next)=>{
    try {
        let data = plainToClass(validatePostInventarios, req.body, {excludeExtraneousValues: true});
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

export default proxyPInventarios;