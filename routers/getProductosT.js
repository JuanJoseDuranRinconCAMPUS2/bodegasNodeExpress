import dotenv from 'dotenv';
import mysql from 'mysql2';
import {Router} from 'express';
const storageGetProductosT = Router();
dotenv.config();
let con = undefined;
storageGetProductosT.use((req,res,next)=>{
    let myconfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myconfig);
    next();
})
// http://127.8.8.7:5008/getProductosT
// ↑	 ↑	↑	↑	↑	↑	↑	↑	↑
//Para ejecutar este endpoint copia la url de arriba y obtendras la data requerida y organizada
 storageGetProductosT.get('/', (req,res)=>{
    console.log(req.query);
    con.query(
        /*SQL*/`SELECT p.*, SUM(i.cantidad) AS Total
                FROM productos p
                INNER JOIN inventarios i ON p.id = i.id_producto
                GROUP BY p.id
                ORDER BY Total DESC;`,
        (err,data,fil)=>{
            if (err) {
                return res.status(500).send('error al mostrar la data');
              }
            data = JSON.stringify(data);
            res.send(JSON.parse(data));
        }
    );
})

export default storageGetProductosT;