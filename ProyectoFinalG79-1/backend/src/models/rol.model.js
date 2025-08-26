// import format from 'pg-format'
import pool from '../../db/config.js'
// import postQuery from '../helpers/filter.js'

export const createRolModel = async (descripcion) => {
    const sqlQuery = 'INSERT INTO rol (descripcion) VALUES ($1) RETURNING *'
    const values = [descripcion]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const readRolActivoModel = async () => {
    const sqlQuery = 'SELECT * FROM rol WHERE estado = 1'
    const response = await pool.query(sqlQuery)
    return response.rows
}

export const readAllRolModel = async () => {
    const sqlQuery = 'SELECT * FROM rol'
    const response = await pool.query(sqlQuery)
    return response.rows
}

export const updateRolModel = async (id, descripcion, estado) => {
    const sqlQuery = 'UPDATE rol SET descripcion = $2, estado= $3 WHERE id_rol = $1 RETURNING *'
    const values = [id, descripcion, estado]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}
