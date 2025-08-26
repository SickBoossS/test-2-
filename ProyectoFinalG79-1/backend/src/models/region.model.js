import pool from '../../db/config.js'

export const createRegionModel = async (descripcion) => {
    const sqlQuery = 'INSERT INTO region (descripcion) VALUES ($1) RETURNING *'
    const values = [descripcion]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const readAllRegionModel = async () => {
  const sqlQuery = `
    SELECT * FROM region
    ORDER BY descripcion ASC`;
  const { rows } = await pool.query(sqlQuery);
  return rows;
};

export const updateRegionModel = async (id, descripcion) => {
    const sqlQuery = 'UPDATE region SET descripcion = $2 WHERE id_region = $1 RETURNING *'
    const values = [id, descripcion]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}


export const deleteRegionModel = async (id) => {
    const sqlQuery = 'DELETE from region WHERE id_region = $1 RETURNING *'
    const values = [id]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}
