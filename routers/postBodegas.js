import dotenv from 'dotenv';
import mysql from 'mysql2';
import {Router} from 'express';
import proxyPBodegas from '../middleware/proxyPBodega.js';
const postBodegas = Router();
dotenv.config();
let con = undefined;
postBodegas.use((req,res,next)=>{
    let myconfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myconfig);
    next();
})
// Para usar esta funcion crea una solicitud POST a "http://127.8.8.7:5008/postBodegas/".
// En el cuerpo de la solicitud, incluye la siguiente data en formato JSON:
// {
//   "id" : 66,
//   "nombre": "un pc gamer",
//   "descripcion" : "un pc gamer con maincra instalado",
//   "estado" : 1,
//   "created_by" : 15,
//   "update_by" : 18
// }
// Recuerda pudes enviar cualquier nombre y numero positivo respetando las reglas del tipo de data en este ejemplo de json y ademas created_by yupdate_by son datos foraneos
 postBodegas.post('/', proxyPBodegas,(req,res)=>{
    const {name_B, identifaction_R, status, created_B, update_B} = req.body;
    con.query(
        /*SQL*/`INSERT INTO bodegas(nombre, id_responsable, estado, created_by, update_by, created_at, updated_at, deleted_at) VALUES(?, ?, ?, ?, ?, CURRENT_TIMESTAMP, NULL, NULL)`,
        [
            name_B, 
            identifaction_R, 
            status, 
            created_B, 
            update_B
        ],
        (err,data,fil)=>{
            if (err) {
                return res.status(500).send(`Error al guardar los datos de bodega \n Error encontrado: ${err.sqlMessage}`);
              }
              res.status(200).send('Datos guardados correctamente');
        }
    );
})

export default postBodegas;