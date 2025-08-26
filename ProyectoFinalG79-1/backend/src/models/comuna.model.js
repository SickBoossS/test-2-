import pool from "../../db/config.js";

/* ────────────── CREAR ────────────── */
export const createComunaModel = async (descripcion, id_region) => {
  const sql = `
    INSERT INTO comuna (descripcion, id_region)
    VALUES ($1, $2)
    RETURNING *`;
  const { rows } = await pool.query(sql, [descripcion, id_region]);
  return rows;
};

export const readAllComunaModel = async () => {
  const sql = `
    SELECT * FROM comuna
    ORDER BY descripcion ASC`;
  const { rows } = await pool.query(sql);
  return rows;
};

export const readComunaByRegionModel = async (id_region) => {
  const sql = `
    SELECT * FROM comuna
    WHERE id_region = $1
    ORDER BY descripcion ASC`;
  const { rows } = await pool.query(sql, [id_region]);
  return rows;
};

export const updateComunanModel = async (id, descripcion, id_region) => {
  const sql = `
    UPDATE comuna
    SET descripcion = $2,
        id_region   = $3
    WHERE id_comuna = $1
    RETURNING *`;
  const { rows } = await pool.query(sql, [id, descripcion, id_region]);
  return rows;
};

export const deleteComunanModel = async (id) => {
  const sql = `
    DELETE FROM comuna
    WHERE id_comuna = $1
    RETURNING *`;
  const { rows } = await pool.query(sql, [id]);
  return rows;
};
