import dotenv from 'dotenv';
import mysql from 'mysql2';
import proxyPProductsInv from '../middleware/proxyPProductosInv.js';
import {Router} from 'express';
const postProductosInv = Router();
dotenv.config();
let con = undefined;
postProductosInv.use((req,res,next)=>{
    let myconfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myconfig);
    next();
})
// Para usar esta funcion crea una solicitud POST a "http://127.8.8.7:5008/postProductosInv".
// En el cuerpo de la solicitud, incluye la siguiente data en formato JSON:
// {
//   "nombre": "Bodega san jorge",
//   "id_responsable": 14,
//   "estado": 1,
//   "created_by": 18,
//   "update_by": 18
// }
// Recuerda pudes enviar cualquier nombre y numero positivo respetando las reglas del tipo de data en este ejemplo de json y ademas id_responsable, created_by yupdate_by son datos foraneos
 postProductosInv.post('/', proxyPProductsInv,(req,res)=>{
    const {Identification, name_P, description, status, created_B, update_B} = req.body;
    let bodegaDefault = 11;
    let cantidadInicial = 1;
    con.query(
        /*SQL*/`INSERT INTO productos(id, nombre, descripcion, estado, created_by, update_by, created_at, updated_at, deleted_at) 
                VALUES(?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, NULL, NULL);
        `,
        [
            Identification, 
            name_P, 
            description, 
            status,  
            created_B, 
            update_B
        ],
        (err,data,fil)=>{
            if (err) {
                return res.status(500).send(`Error al guardar los datos de productos \n Error encontrado: ${err.sqlMessage}`);
              }
              con.query(
                /*SQL*/`INSERT INTO inventarios (id_bodega, id_producto, cantidad, created_by, update_by, created_at, updated_at, deleted_at)
                        VALUES (${bodegaDefault}, ${Identification}, ${cantidadInicial}, ${created_B}, ${update_B}, CURRENT_TIMESTAMP, NULL, NULL);
                `,
                (err,data,fil)=>{
                    if (err) {
                        return res.status(500).send(`Error al guardar los datos de inventario \n Error encontrado: ${err.sqlMessage}`);
                      }
        
                      res.status(200).send('Datos correspondientes a productos y inventaio guardados correctamente');
                }
            );
        }
    );
})

export default postProductosInv;