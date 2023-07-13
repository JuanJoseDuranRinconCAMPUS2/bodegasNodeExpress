# 🚀✨**Prueba Desarrollo BackEnd y SQL**✨🚀

Este proyecto tiene como objetivo realizar una prueba de contratación real de BackEnd que consistía en realizar una conexión a una base de datos utilizando Express, MySQL2 y Dotenv. Proporcionando una API con varias rutas para interactuar con la base de datos.

## **🛠️Apartados del Proyecto🛠️**

[TOC]



## 🍁**Puntos de la prueba**🍁

- [x] Crear un proyecto en Node y conecta la base de datos con mysql2.
- [x] Crear las migraciones para las 5 tablas que se van a usar en el proyecto.
- [x] Importa los datos para realizar las pruebas en el archivo data.sql.
- [x] Realizar un EndPolnt que permita listar todas las bodegas ordenadas alfabéticamente.
- [x]  Realizar un EndPolnt que permita crear una bodegas.(agregar en los comentarios de la función los datos de entrada).
- [x] Realizar un EndPoint que permita listar todos los productos en orden descendente por el campo "Total"
- [x] Realizar un EndPoint que permita insertar un productos y a su vez asigne una cantidad inicial del mismo en la tabla inventarios en una de las bodegas por default.
- [x] Realizar un EndPoint que permita insertar registros en la tabla de inventarios, los parámetros de entrada deben ser(id_producto,id_bodega,cantidad).
- [x] Realizar un EndPolnt que permita Trasladar unproducto de una bodega a otra
- [x] Por cada EndPolnt realizado generar un commit
- [x] Generar un README.md explicando cómo funciona cada Router y como consumirlo

## **💫Requisitos Previos💫**

1.  Node.js instalado en tu máquina. 
2. Una base de datos MySQL disponible.

## **🎉Instalación🎉**

1. Clona este repositorio en tu máquina: `git clone https://github.com/JuanJoseDuranRinconCAMPUS2/pruebaBackend.git`

2. Accede al directorio del proyecto: `cd pruebaBackend`

3. Instala las dependencias: 

   **Dependencias usadas**

   - Nodemon

     `npm i -E -D nodemon`

   - Dotenv 

     `npm i -E -D dotenv` 

   - Express

     `npm i -E -D express`

   - Mysql2

     `npm i -E -D mysql2`
     
   - Class-transformer
   
     `npm i -E -D class-transformer` 
     
   - Reflect-metadata
   
     `npm i -E -D reflect-metadata` 
     
   - Typescript
   
     `npm i -E -D typescript` 

## **🏁Configuración**🏁

1. Crea un archivo `.env` en el directorio raíz del proyecto.

2. Dentro del archivo `.env`, define las siguientes variables de entorno:

   - `host`: dirección del host de la base de datos.
   - `user`: nombre de usuario de la base de datos.
   - `password`: contraseña del usuario de la base de datos.
   - `database`: nombre de la base de datos.
   - `port`: dirección del puerto de la base de datos.
   - `hostname`: dirección del puerto de la api.
   - `port`: dirección del puerto de la api.

   **Estructura:**

   `MY_CONFIG={"hostname": "127.8.8.7", "port":5008}`
   `MY_CONNECT={"host":"", "user":"", "database": "", "password": "", "port" : }`

   

## **⚜️Uso⚜️**

1.  Inicia el servidor:
2. `npm run dev`    
3. Accede a `http://127.8.8.7:5008` para interactuar con la API.

## **💮Rutas💮**

Accede a la API utilizando las siguientes rutas:

### 🚀/GetBodegas🚀

**`GET /GetBodegas`**: Obtiene todos los datos de bodega de forma ordenada alfabéticamente

**Ejemplo de uso**

`http://127.8.8.7:5008/GetBodegas`

### ♾️/postBodegas♾️

**`POST /postBodegas`**:  Permite crear una nueva bodega en la tabla de bodegas

**Estructura**

Para usar este End Point crea una solicitud POST a http://127.8.8.7:5008/postBodegas/.

**En el cuerpo de la solicitud, incluye la siguiente data en formato JSON:**

```json
{
    "id" : 66, 
    "nombre": "un pc gamer",
    "descripcion" : "un pc gamer con maincra instalado",
    "estado" : 1,
    "created_by" : 15,
    "update_by" : 18
}
```

*Recuerda puedes enviar cualquier nombre y numero positivo respetando las reglas del tipo de data en este ejemplo de json y además created_by y update_by son datos foráneos*

### 🏹/getProductosT🏹

**`GET /getProductosT`**: Obtiene todos los datos de productos de forma ordenada en orden descendente por el campo "Total"

**Ejemplo de uso**

`http://127.8.8.7:5008/getProductos`

### 🎇/postProductosInv🎇

**`POST /postProductosInv`**:  Permite insertar un producto y a su vez asignar una cantidad inicial del mismo en la tabla inventarios en una de las bodegas.

**Estructura**

Para usar este End Point crea una solicitud POST a "http://127.8.8.7:5008/postProductosInv".

**En el cuerpo de la solicitud, incluye la siguiente data en formato JSON:**

```json
{
    "nombre": "Bodega san jorge",
    "id_responsable": 14,
    "estado": 1,
    "created_by": 18,
    "update_by": 18
}
```

*Recuerda puedes enviar cualquier nombre y numero positivo respetando las reglas del tipo de data y de estructura en este ejemplo de json y además id_responsable, created_by y update_by son datos foráneos*

### 🍁/postInventarios🍁

**`POST /postInventarios`**:  Este EndPoint permite insertar registros en la tabla de inventarios de la base de datos. 

La tabla de inventarios no permite repetir la combinación de Bodega y Producto. Por lo tanto, antes de realizar la inserción, se valida si la combinación ya existe o es una combinación totalmente nueva. 

Si es una combinación totalmente nueva, se realiza un **INSERT** en la tabla de inventarios considerando los datos ingresados. Si la combinación ya existe, se realiza un **UPDATE** en el registro existente, sumando la cantidad existente con la cantidad nueva proporcionada. 

Si la inserción o actualización es exitosa, se devuelve una respuesta con el código de estado 200 y un mensaje indicando que los datos han sido guardados correctamente. En caso de error, se devuelve una respuesta con el código de estado 500 y un mensaje de error.

**Estructura**

Para usar este End Point crea una solicitud POST a "http://127.8.8.7:5008/postInventarios".

**En el cuerpo de la solicitud, incluye la siguiente data en formato JSON:**

```json
{
	"id_producto" : 20,
 	"id_bodega" : 11,
 	"cantidad" : 50
}
```



*Recuerda puedes enviar cualquier nombre y numero positivo respetando las reglas del tipo de data y de estructura en este ejemplo de json y además id_producto y id_bodega son datos foráneos*

### 🪷/postTransladarInv🪷

**`POST /postTransladarInv`**:  Este EndPoint permite trasladar un producto de una bodega a otra en la tabla de inventarios de la base de datos.

Antes de realizar el traslado, se valida que la cantidad de unidades que se pretende sacar de la bodega de origen sea posible. Si la cantidad a sacar es mayor a la cantidad existente en la bodega de origen, se generará una alerta y se impedirá el registro del traslado. 

Para afectar las tablas de inventarios, se realiza lo siguiente: 

- Se resta la cantidad del producto de la bodega de origen. 
- -Se suma la cantidad del producto a la bodega de destino. 

Además, se realiza un INSERT en la tabla de historiales con toda la información del traslado. Si el traslado es exitoso, se devuelve una respuesta con el código de estado 200 y un mensaje indicando que el traslado se realizó correctamente. En caso de error, se devuelve una respuesta con el código de estado 500 y un mensaje de error. 

**Estructura**

Para usar este End Point crea una solicitud POST a "http://127.8.8.7:5008/postTransladarInv".

**En el cuerpo de la solicitud, incluye la siguiente data en formato JSON:**

```json
{ 
 	"id_bodegaOrigen" : 12,
     "id_bodegaFinal" : 11,
     "id_producto" : 20,
     "cantidad" : 50
}
```


*Recuerda puedes enviar cualquier nombre y numero positivo respetando las reglas del tipo de data y de estructura en este ejemplo de json y además id_producto , id_bodegaOrigen y id_bodegaFinal son datos foráneos*

## **🌌Contribución🌌**

Si deseas contribuir a este proyecto, siéntete libre de abrir una solicitud de extracción (pull request) o informar cualquier problema que encuentres.

## **😶‍🌫️Licencias😶‍🌫️**

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).



¡Gracias por visitar mi proyecto!