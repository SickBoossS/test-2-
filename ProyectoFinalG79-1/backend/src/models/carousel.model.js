import pool from '../../db/config.js'

export const createCarouselModel = async (img) => {
    const sqlQuery = 'INSERT INTO carousel (img) VALUES ($1) RETURNING *'
    const values = [img]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const readCarouselModel = async () => {
    const sqlQuery = 'SELECT * FROM carousel'
    const response = await pool.query(sqlQuery)
    return response.rows
}

export const deleteCarouselModel = async (id) => {
    const sqlQuery = 'DELETE FROM carousel WHERE id_carousel = $1 RETURNING *'
    const values = [id]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}
