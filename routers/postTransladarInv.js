import dotenv from 'dotenv';
import mysql from 'mysql2';
import {Router} from 'express';
const postTransladarInv = Router();
dotenv.config();
let con = undefined;
postTransladarInv.use((req,res,next)=>{
    let myconfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myconfig);
    next();
})
 // http://127.8.8.7:5008/postTransladarInv?id_bodegaOrigen=""&id_bodegaFinal=""&id_producto=""&cantidad=""
 //↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	↑	
 //Para ejecutar este endpoint copia la url de arriba y cambia los espacios en blanco por la data correspondiente (recuerda borrar los " "). recuerda que la cantidad debe ser un numero
 // y los valores id_producto, id_bodegaOrigen y id_bodegaFinal  son datos forreanos de la tabla producto y bodega
 postTransladarInv.post('/', (req,res)=>{
    const {id_bodegaOrigen, id_bodegaFinal, id_producto, cantidad} = req.query;
    con.query(
        /*SQL*/`
            SELECT cantidad, id FROM inventarios WHERE id_bodega = ${id_bodegaOrigen} AND id_producto = ${id_producto};
        `,
        (err,data,fil)=>{

            let cantidadActual = data[0].cantidad;

            if (err) {
                return res.status(500).send(`Error al verificar la combinacion \n Error encontrado: ${err.sqlMessage}`);
            }
            if (cantidad > cantidadActual) {
                return res.status(400).send(`La cantidad a trasladar es mayor que la cantidad disponible en la bodega de origen`);
            }

            let cantidadMinus = cantidadActual - cantidad;
            con.query(
                /*SQL*/`UPDATE inventarios SET cantidad = ?, updated_at = CURRENT_TIMESTAMP WHERE id_bodega = ? AND id_producto = ?;`,
                [cantidadMinus, id_bodegaOrigen, id_producto],
                (err,data2,fil)=>{
                    if (err) {
                        return res.status(500).send(`Error al actualizar los datos de inventario \n Error encontrado: ${err.sqlMessage}`);
                      }
        
                      con.query(
                        /*SQL*/`
                            SELECT cantidad FROM inventarios WHERE id_bodega = ${id_bodegaFinal} AND id_producto = ${id_producto};
                        `,
                        (err,data3,fil)=>{
                            if (err) {
                                return res.status(500).send(`Error al verificar la combinacion \n Error encontrado: ${err.sqlMessage}`);
                            }
                            if (cantidad > cantidadActual) {
                                return res.status(400).send(`La cantidad a trasladar es mayor que la cantidad disponible en la bodega de origen`);
                            }
                
                            cantidadActual = Number(data3[0].cantidad);
                            let cantidadPlus = Number(cantidad) + cantidadActual;
                            con.query(
                                /*SQL*/`UPDATE inventarios SET cantidad = ?, updated_at = CURRENT_TIMESTAMP WHERE id_bodega = ? AND id_producto = ?;`,
                                [cantidadPlus, id_bodegaFinal, id_producto],
                                (err,data4,fil)=>{
                                    if (err) {
                                        return res.status(500).send(`Error al actualizar los datos de inventario \n Error encontrado: ${err.sqlMessage}`);
                                    }
                        
                                    con.query(
                                        /*SQL*/`INSERT INTO historiales (cantidad, id_bodega_origen, id_bodega_destino, id_inventario, created_at)
                                            VALUES (${cantidad}, ${id_bodegaOrigen}, ${id_bodegaFinal}, 68, CURRENT_TIMESTAMP);`,
                                        (err,data3,fil)=>{
                                            if (err) {
                                                return res.status(500).send(`Error al guardar los datos del historial \n Error encontrado: ${err.sqlMessage}`);
                                              }
                                
                                              res.status(200).send('Datos correspondientes a inventario actualizados correctamente');
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
})

export default postTransladarInv;