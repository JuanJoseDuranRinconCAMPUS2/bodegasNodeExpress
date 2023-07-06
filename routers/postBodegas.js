import dotenv from 'dotenv';
import mysql from 'mysql2';
import {Router} from 'express';
const storagePostBodegas = Router();
dotenv.config();
let con = undefined;
storagePostBodegas.use((req,res,next)=>{
    let myconfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myconfig);
    next();
})
 // http://127.8.8.7:5008/postBodegas?id=""&nombre=""&id_responsable=""&estado=""&created_by=""&update_by=""&created_at=""&updated_at=""&deleted_at=""
 //↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	
 //Para ejecutar este endpoint copia la url de arriba y cambia los espacios en blanco por la data correspondiente. recuerda que el id debe ser un numero unico que no este en la tabla principal
 // y los valores id_responsable, created_by, update_by son datos forreanos de la tabla USERS
storagePostBodegas.post('/', (req,res)=>{
    const { id, nombre, id_responsable, estado, created_by, update_by, created_at, updated_at, deleted_at} = req.query;
    console.log(req.query);
    con.query(
        /*SQL*/`INSERT INTO bodegas(id, nombre, id_responsable, estado, created_by, update_by, created_at, updated_at, deleted_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, nombre, id_responsable, estado, created_by, update_by, created_at, updated_at, deleted_at],
        (err,data,fil)=>{
            if (err) {
                return res.status(500).send('Error al guardar los datos');
              }
              res.status(200).send('Datos guardados correctamente');
            // data = JSON.stringify(data);
            // res.send(JSON.parse(data));
        }
    );
})

export default storagePostBodegas;