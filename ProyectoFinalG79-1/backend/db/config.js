import pg from 'pg'
import 'dotenv/config'

const { DB_URL } = process.env

const pool = new pg.Pool({
  connectionString: DB_URL
})

pool.connect()
  .then(() => console.log("✅ Conectado correctamente"))
  .catch(err => console.error("❌ Error conectando a DB:", err));

export default pool

