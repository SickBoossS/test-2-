import pool from '../../db/config.js'

export const createDireccionModel = async (id_usuario, direccion, numero, anexo, id_region, id_comuna) => {
    const sqlQuery = `INSERT INTO direccion (id_usuario, direccion, numero, anexo, id_region, id_comuna) 
                    VALUES ($1, $2, $3, $4, $5, $6) 
                    RETURNING *`
    const values = [id_usuario, direccion, numero, anexo, id_region, id_comuna]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const getDireccionByUserModel = async (id_usuario) => {
    const sqlQuery = 'SELECT * FROM direccion WHERE id_usuario = $1'
    const values = [id_usuario]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const getDireccionByIdDireccionModel = async (id) => {
    const sqlQuery = 'SELECT * FROM direccion WHERE id_direccion = $1'
    const values = [id]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const updateDireccionModel = async (id, direccion, numero, anexo, id_region, id_comuna) => {
    const sqlQuery = `UPDATE direccion 
                        SET direccion = $2,
                        numero = $3,
                        anexo = $4,
                        id_region = $5,
                        id_comuna = $6  
                        WHERE id_direccion = $1 RETURNING *`
    const values = [id, direccion, numero, anexo, id_region, id_comuna]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}


export const deleteDireccionModel = async (id) => {
    const sqlQuery = 'DELETE from direccion WHERE id_direccion = $1 RETURNING *'
    const values = [id]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}
