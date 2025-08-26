-- Active: 1737596334296@@127.0.0.1@5432@proy001
CREATE DATABASE proy001;
\c proy001;
-- Crear tabla de roles
CREATE TABLE rol (
    id_rol SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) UNIQUE NOT NULL,
    estado INT DEFAULT 1 NOT NULL
);

-- Crea tabla de carousel
CREATE TABLE carousel (
    id_carousel SERIAL PRIMARY KEY,
    img TEXT UNIQUE NOT NULL,
    estado INT DEFAULT 1 NOT NULL
);
-- Crear tabla de regiones
CREATE TABLE region(
    id_region SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) UNIQUE NOT NULL
);

-- Crear tabla de comunas
CREATE TABLE comuna (
  id_comuna SERIAL PRIMARY KEY,
  descripcion VARCHAR(50) UNIQUE NOT NULL,
  id_region INT NOT NULL,
  CONSTRAINT fk_region
    FOREIGN KEY (id_region)
    REFERENCES region(id_region)
    ON DELETE CASCADE
);

-- Crear tabla de usuarios
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    rut VARCHAR(10),
    telefono VARCHAR(20), 
    img TEXT,  
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_rol INT NOT NULL DEFAULT 2,
    estado INT DEFAULT 1 NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

-- Crear tabla de direcciones
CREATE TABLE direccion(
    id_direccion SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL, 
    direccion VARCHAR(100) NOT NULL,
    numero INT,
    anexo VARCHAR(100),
    id_region INT NOT NULL, 
    id_comuna INT NOT NULL, 
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_region) REFERENCES region(id_region),
    FOREIGN KEY (id_comuna) REFERENCES comuna(id_comuna)
);

-- Crear tabla de categorías
CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    descripcion VARCHAR(100) UNIQUE NOT NULL,
    estado INT DEFAULT 1 NOT NULL
);

CREATE TABLE producto (
    id_producto SERIAL PRIMARY KEY,
    id_categoria INT NOT NULL REFERENCES categoria(id_categoria),
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    idioma VARCHAR(50) NOT NULL DEFAULT "EN",
    precio_venta NUMERIC(10, 0) NOT NULL,
    descuento NUMERIC(10, 0) NOT NULL DEFAULT 0,
    img TEXT NOT NULL,
    estado VARCHAR(10) NOT NULL,
    stock   INT NOT NULL DEFAULT 0,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE producto_mtg (
    id_producto INT PRIMARY KEY REFERENCES producto(id_producto) ON DELETE CASCADE,
    rareza VARCHAR(50) NOT NULL,
    edicion VARCHAR(50) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    foil BOOLEAN NOT NULL
);

-- Crear tabla de inventario
CREATE TABLE inventario(
    id_inventario SERIAL PRIMARY KEY,
    id_producto INT NOT NULL,
    precio_compra NUMERIC(10, 0) NOT NULL,
    cantidad INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- Crear tabla de productos por usuario / FAVORITOS
CREATE TABLE usuario_producto(
    id_usuario_producto SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- Crear tabla de ventas
CREATE TABLE venta(
    id_venta SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    descripcion VARCHAR(100),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Crear tabla de detalle de ventas
CREATE TABLE venta_detalle(
    id_venta_detalle SERIAL PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_venta INT NOT NULL,
    descuento INT NOT NULL,
    precio_final INT NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- Insertar roles
INSERT INTO rol (descripcion) 
VALUES 
    ('Administrador'),
    ('Estandar');

-- Insertar regiones
INSERT INTO region (id_region, descripcion) 
VALUES
(1, 'Arica y Parinacota'),
(2, 'Tarapacá'),
(3, 'Antofagasta'),
(4, 'Atacama'),
(5, 'Coquimbo'),
(6, 'Valparaíso'),
(7, 'Metropolitana de Santiago'),
(8, 'Libertador General Bernardo O''Higgins'),
(9, 'Maule'),
(10, 'Ñuble'),
(11, 'Biobío'),
(12, 'La Araucanía'),
(13, 'Los Ríos'),
(14, 'Los Lagos'),
(15, 'Aysén del General Carlos Ibáñez del Campo'),
(16, 'Magallanes y de la Antártica Chilena');

-- Insertar comunas
INSERT INTO comuna (descripcion) 
VALUES 
    ('SANTIAGO'),
    ('PROVIDENCIA'),
    ('LAS CONDES'),
    ('VIÑA DEL MAR');
-- Insertar categorías
INSERT INTO categoria (descripcion)
VALUES 
  ('single_mtg'),
  ('accesorios_tcg'),
  ('sellados_tcg'),
  ('figuras'),
  ('peluches_otros'),
  ('videojuegos_acc')
ON CONFLICT (descripcion) DO NOTHING; -- evita duplicados si ya existen

-- Nuevas categorías
INSERT INTO categoria (descripcion)
VALUES ('nombre_de_la_categoria')
ON CONFLICT (descripcion) DO NOTHING;

-- Insertar usuario admin
INSERT INTO usuario (nombre, apellido, rut, email, password)
VALUES  
    ('Juan', 'Pérez', '12345678-9', 'admin@admin.com', '123456');

-- Cambiar rol del usuario creado a Administrador
UPDATE usuario
SET id_rol = 1
WHERE id_usuario = 1;


--Pruebas:
-- Mostrar usuarios con su rol
SELECT 
    u.*,
    r.descripcion
FROM    
    usuario AS u 
    INNER JOIN rol AS r ON u.id_rol = r.id_rol;


SELECT * FROM rol;
SELECT * FROM usuario;
SELECT * FROM producto;

-- Insertar productos en producto:

INSERT INTO producto (id_categoria, nombre, descripcion, idioma, precio_venta, img, estado)
VALUES
(4, 'Rhystic Study', 'Whenever an opponent casts a spell, you may draw a card unless that player pays {1}.', 'Inglés EN', 110000, 'https://cards.scryfall.io/large/front/e/6/e6a06aad-6073-465b-89d0-8c4ae4307aff.jpg?1692933103', 'NM'),

(4, 'Cloud, Midgar Mercenary', 'When Cloud enters, search your library for an Equipment card, reveal it, put it into your hand, then shuffle. As long as Cloud is equipped, if an ability of Cloud or an Equipment attached to it triggers, that ability triggers an additional time.', 'Inglés EN', 21500, 'https://cards.scryfall.io/large/front/2/c/2cf7e8a3-fad7-413d-b17c-7519a9cf5fb5.jpg?1748705791', 'NM'),

(5, 'Commander box', 'Box para 100 cartas con hasta doble forro, también se puede colocar el comandante a la vista', 'N/A', 9990, 'https://img.kwcdn.com/product/fancy/5c86047e-91ea-4cfd-8cae-efa8543fe454.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp', 'NM'),

(6, 'Bundle MTG Final Fantasy', 'Bundle con 9 sobres playboosters, 1 dado promocional y cartas promocionales', 'Inglés EN', 89990, 'https://cdnx.jumpseller.com/vudu-gaming/image/62983067/thumb/1079/1079?1745861019', 'NM'),

(7, 'Figura de Luffy', 'Figura coleccionable de luffy gear5 - no articulada, esta ehcha de PVC', 'N/A', 13990, 'https://down-cl.img.susercontent.com/file/sg-11134201-7qvfz-ljmoubsw12it3e', 'NM'),

(3, 'Peluche de Pikachu', 'Peluche de 40cm de alto, hecho de algodón suave al tacto, ideal para cualquier edad', 'N/A', 19990, 'https://home.ripley.cl/store/Attachment/WOP/D175/2000400187835/2000400187835-4.jpg', 'NM'),

(3, 'Zelda - Tears of the kingdom', 'The legend of Zelda - Tears of the kingdom, esta versión es la de Switch2, incluye mejoras visuales y de rendimiento', 'Multilenguaje', 79990, 'https://sniper.cl/cdn/shop/files/totknsw2.webp?v=1746163418', 'NM');

/*
** TRIGGER ACTUALIZA STOCK
*/
CREATE OR REPLACE FUNCTION actualizar_stock_producto()
RETURNS TRIGGER AS $$
BEGIN
  -- Sumar la cantidad del nuevo inventario al stock actual
  UPDATE producto
  SET stock = stock + NEW.cantidad
  WHERE id_producto = NEW.id_producto;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_actualizar_stock
AFTER INSERT ON inventario
FOR EACH ROW
EXECUTE FUNCTION actualizar_stock_producto();

CREATE OR REPLACE FUNCTION descontar_stock_producto()
RETURNS TRIGGER AS $$
BEGIN
  -- Restar la cantidad eliminada del stock actual
  UPDATE producto
  SET stock = stock - OLD.cantidad
  WHERE id_producto = OLD.id_producto;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_descontar_stock
AFTER DELETE ON inventario
FOR EACH ROW
EXECUTE FUNCTION descontar_stock_producto();

/*
** TRIGGER STOCK
** DESCUENTA AL HACER UNA VENTA
*/

CREATE OR REPLACE FUNCTION descontar_stock_por_venta()
RETURNS TRIGGER AS $$
BEGIN
  -- Descontar la cantidad vendida del stock
  UPDATE producto
  SET stock = stock - NEW.cantidad
  WHERE id_producto = NEW.id_producto;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_descontar_stock_venta
AFTER INSERT ON venta_detalle
FOR EACH ROW
EXECUTE FUNCTION descontar_stock_por_venta();