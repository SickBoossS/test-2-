// import format from 'pg-format'
import pool from '../../db/config.js'
// import postQuery from '../helpers/filter.js'

export const createCategoriaModel = async (descripcion) => {
    const sqlQuery = 'INSERT INTO categoria (descripcion) VALUES ($1) RETURNING *'
    const values = [descripcion]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const readCategoriaActivoModel = async () => {
    const sqlQuery = 'SELECT * FROM categoria WHERE estado = 1'
    const response = await pool.query(sqlQuery)
    return response.rows
}

export const readAllCategoriaModel = async () => {
    const sqlQuery = 'SELECT * FROM categoria'
    const response = await pool.query(sqlQuery)
    return response.rows
}

export const updateCategoriaModel = async (id, descripcion, estado) => {
    const sqlQuery = 'UPDATE categoria SET descripcion = $2, estado= $3 WHERE id_categoria = $1 RETURNING *'
    const values = [id, descripcion, estado]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}
