import dotenv from 'dotenv';
import mysql from 'mysql2';
import {Router} from 'express';
const storageCampus = Router();
dotenv.config();
let con = undefined;
storageCampus.use((req,res,next)=>{
    let myconfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myconfig);
    next();
})
storageCampus.get('/', (req,res)=>{
    con.query(
        /*SQL*/`SELECT * FROM bodegas ORDER BY nombre ASC;`,
        (err,data,fil)=>{
            data = JSON.stringify(data);
            res.send(JSON.parse(data));
        }
    );
})
storageCampus.post('/', (req,res)=>{
    res.send("funcion de post");
})
storageCampus.put('/', (req,res)=>{
    res.send("funcion de put");
})
storageCampus.delete('/', (req,res)=>{
    res.send("funcion de delete");
})

export default storageCampus;