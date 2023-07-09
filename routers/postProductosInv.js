import dotenv from 'dotenv';
import mysql from 'mysql2';
import {Router} from 'express';
const postProductosInv = Router();
dotenv.config();
let con = undefined;
postProductosInv.use((req,res,next)=>{
    let myconfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myconfig);
    next();
})
 // http://127.8.8.7:5008/postProductosInv?id=""&nombre=""&descripcion=""&estado=""&created_by=""&update_by=""&created_at=""&updated_at&deleted_at=""
 //↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	
 //Para ejecutar este endpoint copia la url de arriba y cambia los espacios en blanco por la data correspondiente (recuerda borrar los " "). recuerda que el id debe ser un numero unico que no este en la tabla principal
 // y los valores created_by, update_by son datos forreanos de la tabla USERS
 postProductosInv.post('/', (req,res)=>{
    const {id, nombre, descripcion, estado, created_by, update_by, created_at, updated_at, deleted_at} = req.query;
    let bodegaDefault = 11;
    let cantidadInicial = 1;
    con.query(
        /*SQL*/`INSERT INTO productos(id, nombre, descripcion, estado, created_by, update_by, created_at, updated_at, deleted_at) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [
            id, 
            nombre, 
            descripcion, 
            estado,  
            created_by === "" ? null : created_by, 
            update_by === "" ? null : update_by, 
            created_at === "" ? null : created_at, 
            updated_at === "" ? null : updated_at, 
            deleted_at === "" ? null : deleted_at
        ],
        (err,data,fil)=>{
            if (err) {
                return res.status(500).send(`Error al guardar los datos de productos \n Error encontrado: ${err.sqlMessage}`);
              }
              con.query(
                /*SQL*/`INSERT INTO inventarios (id_bodega, id_producto, cantidad, created_by, update_by, created_at, updated_at, deleted_at)
                        VALUES (${bodegaDefault}, ${id}, ${cantidadInicial}, ${created_by}, ${update_by}, ?, ?, ?);
                `,
                [
                    created_at === "" ? null : created_at, 
                    updated_at === "" ? null : updated_at, 
                    deleted_at === "" ? null : deleted_at
                ],
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