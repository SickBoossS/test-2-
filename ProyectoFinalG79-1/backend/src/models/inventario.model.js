import pool from '../../db/config.js'

export const createInventarioModel = async (id_producto, precio_compra, cantidad) => {
    const sqlQuery = 'INSERT INTO inventario (id_producto, precio_compra, cantidad) VALUES ($1, $2, $3) RETURNING *'
    const values = [id_producto, precio_compra, cantidad]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const readInventarioModel = async () => {
    const sqlQuery = 'SELECT * FROM inventario'
    const response = await pool.query(sqlQuery)
    return response.rows
}

export const readInventarioByProductoModel = async (id) => {
    const sqlQuery = 'SELECT * FROM inventario where id_producto = $1'
    const values = [id]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const deleteInventarioModel = async (id) => {
    const sqlQuery = 'DELETE FROM inventario WHERE id_inventario = $1 RETURNING *'
    const values = [id]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}
