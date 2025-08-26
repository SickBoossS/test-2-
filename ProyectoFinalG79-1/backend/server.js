import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import rolRoutes from './routes/rol.routes.js'
import categoriaRoutes from './routes/categoria.routes.js'
import carouselRoutes from './routes/carousel.routes.js'
import regionRoutes from './routes/region.routes.js'
import comunaRoutes from './routes/comuna.routes.js'
import direccionRoutes from './routes/direccion.routes.js'
import productoRoutes from './routes/producto.routes.js'
import inventarioRoutes from './routes/inventario.routes.js'
import ventaRoutes from './routes/venta.routes.js'

import { log } from './middleware/log.middleware.js'


const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors())
app.use(log)

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api',rolRoutes)
app.use('/api',categoriaRoutes)
app.use('/api',carouselRoutes)
app.use('/api',regionRoutes)
app.use('/api',comunaRoutes)
app.use('/api',direccionRoutes)
app.use('/api', productoRoutes)
app.use('/api', inventarioRoutes)
app.use('/api', ventaRoutes)

// console.log('Tipo:', typeof process.env.DB_PASSWORD, 'Valor:', process.env.DB_PASSWORD)

app.listen(PORT, console.log(`🍒 Server http://localhost:${PORT}`))


export default app