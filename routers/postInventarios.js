import dotenv from 'dotenv';
import mysql from 'mysql2';
import proxyPInventarios from '../middleware/proxyPInventarios.js';
import {Router} from 'express';
const postInventarios = Router();
dotenv.config();
let con = undefined;
postInventarios.use((req,res,next)=>{
    let myconfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myconfig);
    next();
})
 // http://127.8.8.7:5008/postInventarios?id_producto=""&id_bodega=""&cantidad=""
 //↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	
 //Para ejecutar este endpoint copia la url de arriba y cambia los espacios en blanco por la data correspondiente (recuerda borrar los " "). recuerda que el id debe ser un numero unico que no este en la tabla principal
 // y los valores id_producto, id_bodega son datos forreanos de la tabla producto y bodega
 postInventarios.post('/', proxyPInventarios, (req,res)=>{
    const {identifaction_B, identifaction_P, amount} = req.body;
    con.query(
        /*SQL*/`
            SELECT * FROM inventarios WHERE id_bodega = ${identifaction_B} AND id_producto = ${identifaction_P};
        `,
        (err,data,fil)=>{ 
            if (err) {
                return res.status(500).send(`Error al verificar la combinacion \n Error encontrado: ${err.sqlMessage}`);
            }
            switch (data.length) {
                case 0:
                    con.query(
                        /*SQL*/`INSERT INTO inventarios (id_bodega, id_producto, cantidad) VALUES  (?, ?, ?);`,
                        [
                            identifaction_B, identifaction_P, amount
                        ],
                        (err,data2,fil)=>{
                            if (err) {
                                return res.status(500).send(`Error al guardar los datos de inventario \n Error encontrado: ${err.sqlMessage}`);
                              }
                
                              res.status(200).send('Datos correspondientes a inventario guardados correctamente');
                        }
                    );
                    break;
            
                default:
                    let cantidadActual = Number(data[0].cantidad);
                    let cantidadPlus = Number(amount) + cantidadActual;
                    con.query(
                        /*SQL*/`UPDATE inventarios SET cantidad = ? WHERE id_bodega = ? AND id_producto = ?;`,
                        [
                        cantidadPlus, identifaction_B, identifaction_P
                        ],
                        (err,data2,fil)=>{
                            if (err) {
                                return res.status(500).send(`Error al actualizar los datos de inventario \n Error encontrado: ${err.sqlMessage}`);
                              }
                
                              res.status(200).send('Datos correspondientes a inventario actualizados correctamente');
                        }
                    );
                    break;
            }
        }
    );
})

export default postInventarios;