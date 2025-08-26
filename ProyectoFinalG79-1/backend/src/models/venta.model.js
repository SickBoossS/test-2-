import pool from '../../db/config.js';

export const createVentaModel = async (id_usuario, descripcion, tipoEntrega, direccionEnvio) => {
  const sqlQuery = `
    INSERT INTO venta (id_usuario, descripcion, tipo_Entrega, direccion_envio) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *`;
  const values = [id_usuario, descripcion, tipoEntrega, direccionEnvio];
  const response = await pool.query(sqlQuery, values);
  return response.rows;
};

export const readVentaByUsuarioModel = async (id) => {
  const sqlQuery = `
    SELECT 
      ven.id_venta, 
      ven.id_usuario, 
      ven.descripcion, 
      ven.tipo_Entrega, 
      ven.direccion_envio, 
      to_char(ven.fecha_registro, 'DD-MM-YYYY') AS fecha_venta, 
      SUM(det.precio_final) AS total_venta
    FROM venta ven
    JOIN venta_detalle det ON ven.id_venta = det.id_venta
    WHERE ven.id_usuario = $1
    GROUP BY 
      ven.id_venta, ven.id_usuario, ven.descripcion, ven.tipo_Entrega, ven.direccion_envio, to_char(ven.fecha_registro, 'DD-MM-YYYY')
    ORDER BY ven.id_venta`;
  const values = [id];
  const response = await pool.query(sqlQuery, values);
  return response.rows;
};

export const createVentaDetalleModel = async (id_venta, id_producto, cantidad, precio_venta, descuento, precio_final) => {
  const sqlQuery = `
    INSERT INTO venta_detalle (id_venta, id_producto, cantidad, precio_venta, descuento, precio_final) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *`;
  const values = [id_venta, id_producto, cantidad, precio_venta, descuento, precio_final];
  const response = await pool.query(sqlQuery, values);
  return response.rows;
};

export const readVentaByVentaModel = async (id) => {
  const sqlQuery = `
    SELECT 
      id_venta_detalle,
      id_venta, 
      id_producto, 
      cantidad, 
      precio_venta, 
      descuento, 
      precio_final 
    FROM venta_detalle 
    WHERE id_venta = $1`;
  const values = [id];
  const response = await pool.query(sqlQuery, values);
  return response.rows;
};
