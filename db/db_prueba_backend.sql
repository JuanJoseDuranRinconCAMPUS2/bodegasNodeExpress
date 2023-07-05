-- Active: 1688561253892@@127.0.0.1@5501

/* Creacion de la base de datos */

CREATE DATABASE db_prueba_backend_sql;

USE db_prueba_backend_sql;

/*Creacion de la tabla Users*/
CREATE TABLE users(
    id BIGINT(20) UNSIGNED PRIMARY KEY COMMENT'Identificador del usuario',
    nombre VARCHAR(255) COMMENT'Nombre del usuario',
    email VARCHAR(255) UNIQUE COMMENT'Email del usuario',
    email_verified_at TIMESTAMP COMMENT'Tiempo de verificacion',
    estado TINYINT(4) COMMENT'Estado del usuario',
    created_by BIGINT(20) UNSIGNED COMMENT'Creado por',
    update_by BIGINT(20) UNSIGNED COMMENT'Actualizado por',
    foto VARCHAR(255) COMMENT'Foto del usuario',
    password VARCHAR(255) COMMENT'Contraseña del usuario',
    created_at TIMESTAMP COMMENT'Tiempo de creacion',
    updated_at TIMESTAMP COMMENT'Tiempo de actualizacion',
    deleted_at TIMESTAMP COMMENT'Tiempo de eliminacion'
);
/*Creacion de la tabla Producto*/
CREATE TABLE productos(
    id BIGINT(20) UNSIGNED PRIMARY KEY COMMENT'Identificador del producto',
    nombre VARCHAR(255) COMMENT'Nombre del producto',
    descripcion VARCHAR(255) COMMENT'Email del usuario',
    estado TINYINT(4) COMMENT'Estado del producto',
    created_by BIGINT(20) UNSIGNED COMMENT'Creado por',
    update_by BIGINT(20) UNSIGNED COMMENT'Actualizado por',
    created_at TIMESTAMP COMMENT'Tiempo de creacion',
    updated_at TIMESTAMP COMMENT'Tiempo de actualizacion',
    deleted_at TIMESTAMP COMMENT'Tiempo de eliminacion'
);
/*Creacion de la tabla Bodegas*/
CREATE TABLE bodegas(
    id BIGINT(20) UNSIGNED PRIMARY KEY COMMENT'Identificador de la bodega',
    nombre VARCHAR(255) COMMENT'Nombre de la bodega',
    id_responsable BIGINT(20) UNSIGNED COMMENT'identificador del responsable',
    estado TINYINT(4) COMMENT'Estado de la bodega',
    created_by BIGINT(20) UNSIGNED COMMENT'Creado por',
    update_by BIGINT(20) UNSIGNED COMMENT'Actualizado por',
    created_at TIMESTAMP COMMENT'Tiempo de creacion',
    updated_at TIMESTAMP COMMENT'Tiempo de actualizacion',
    deleted_at TIMESTAMP COMMENT'Tiempo de eliminacion'
);
/*Creacion de la tabla Inventarios*/
CREATE TABLE inventarios(
    id BIGINT(20) UNSIGNED PRIMARY KEY COMMENT'Identificador del inventario',
    id_bodega BIGINT(20) UNSIGNED UNIQUE COMMENT'id de la bodega',
    id_producto BIGINT(20) UNSIGNED UNIQUE COMMENT'id del producto',
    cantidad INT(11) COMMENT'Cantidad del producto en el inventario',
    created_by BIGINT(20) UNSIGNED COMMENT'Creado por',
    update_by BIGINT(20) UNSIGNED COMMENT'Actualizado por',
    created_at TIMESTAMP COMMENT'Tiempo de creacion',
    updated_at TIMESTAMP COMMENT'Tiempo de actualizacion',
    deleted_at TIMESTAMP COMMENT'Tiempo de eliminacion'
);
/*Creacion de la tabla historiales*/
CREATE TABLE historiales(
    id BIGINT(20) UNSIGNED PRIMARY KEY COMMENT'Identificador del historial',
    cantidad INT(11) COMMENT'Cantidad en el historial',
    id_bodega_origen BIGINT(20) UNSIGNED  COMMENT'id de la bodega',
    id_bodega_destino BIGINT(20) UNSIGNED  COMMENT'id de la bodega',
    id_inventario BIGINT(20) UNSIGNED COMMENT'id del inventario',
    created_by BIGINT(20) UNSIGNED COMMENT'Creado por',
    update_by BIGINT(20) UNSIGNED COMMENT'Actualizado por',
    created_at TIMESTAMP COMMENT'Tiempo de creacion',
    updated_at TIMESTAMP COMMENT'Tiempo de actualizacion',
    deleted_at TIMESTAMP COMMENT'Tiempo de eliminacion'
);
