import pool from '../../db/config.js'

export const createUserFavModel = async (id_usuario, id_producto) => {
    const sqlQuery = 'INSERT INTO usuario_producto (id_usuario, id_producto) VALUES ($1, $2) RETURNING *'
    const values = [id_usuario, id_producto]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const readUserFavModel = async (id_usuario) => {
    const sqlQuery = 'SELECT * FROM usuario_producto WHERE id_usuario = $1'
    const values = [id_usuario]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const deleteUserFavModel = async (id_usuario, id_producto) => {
    const sqlQuery = 'DELETE FROM usuario_producto WHERE id_usuario = $1 AND id_producto = $2 RETURNING *'
    const values = [id_usuario, id_producto]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}
