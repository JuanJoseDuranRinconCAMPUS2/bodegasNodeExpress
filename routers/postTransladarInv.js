import dotenv from 'dotenv';
import mysql from 'mysql2';
import proxyPTransladarInv from '../middleware/proxyPTransladarInv.js';
import {Router} from 'express';
const postTransladarInv = Router();
dotenv.config();
let con = undefined;
postTransladarInv.use((req,res,next)=>{
    let myconfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myconfig);
    next();
})
// Para usar esta funcion crea una solicitud POST a "http://127.8.8.7:5008/postTransladarInv".
// En el cuerpo de la solicitud, incluye la siguiente data en formato JSON:
// {
//     "id_bodegaOrigen" : 12,
//     "id_bodegaFinal" : 11,
//     "id_producto" : 20,
//     "cantidad" : 50
//   }
// Recuerda pudes enviar cualquier nombre y numero positivo respetando las reglas del tipo de data en este ejemplo de json y ademas id_bodegaOrigen, id_bodegaFinal y id_producto son datos foraneos
 postTransladarInv.post('/', proxyPTransladarInv, (req,res)=>{
    const {identifaction_BO, identifaction_BF, identifaction_P, amount} = req.body;
    con.query(
        /*SQL*/`
            SELECT cantidad, id FROM inventarios WHERE id_bodega = ${identifaction_BO} AND id_producto = ${identifaction_P};
        `,
        (err,data,fil)=>{
            console.log(data);
            if (data.length === 0) {
                return res.status(500).send(`Error al verificar la combinacion \n Error encontrado: combinacion incorrecta`);
            }
            let cantidadActual = data[0].cantidad;
            if (amount > cantidadActual) {
                return res.status(400).send(`La cantidad a trasladar es mayor que la cantidad disponible en la bodega de origen`);
            }
            let cantidadMinus = cantidadActual - amount;
            con.query(
                /*SQL*/`UPDATE inventarios SET cantidad = ?, updated_at = CURRENT_TIMESTAMP WHERE id_bodega = ? AND id_producto = ?;`,
                [cantidadMinus, identifaction_BO, identifaction_P],
                (err,data2,fil)=>{
                    if (err) {
                        return res.status(500).send(`Error al actualizar los datos de inventario \n Error encontrado: ${err.sqlMessage}`);
                      }
        
                      con.query(
                        /*SQL*/`
                            SELECT cantidad FROM inventarios WHERE id_bodega = ${identifaction_BF} AND id_producto = ${identifaction_P};
                        `,
                        (err,data3,fil)=>{
                            if (err) {
                                return res.status(500).send(`Error al verificar la combinacion \n Error encontrado: ${err.sqlMessage}`);
                            }
                            cantidadActual = Number(data3[0].cantidad);
                            let cantidadPlus = Number(amount) + cantidadActual;
                            con.query(
                                /*SQL*/`UPDATE inventarios SET cantidad = ?, updated_at = CURRENT_TIMESTAMP WHERE id_bodega = ? AND id_producto = ?;`,
                                [cantidadPlus, identifaction_BF, identifaction_P],
                                (err,data4,fil)=>{
                                    if (err) {
                                        return res.status(500).send(`Error al actualizar los datos de inventario \n Error encontrado: ${err.sqlMessage}`);
                                    }
                        
                                    con.query(
                                        /*SQL*/`INSERT INTO historiales (cantidad, id_bodega_origen, id_bodega_destino, id_inventario, created_at)
                                            VALUES (${amount}, ${identifaction_BO}, ${identifaction_BF}, ${data[0].id}, CURRENT_TIMESTAMP);`,
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