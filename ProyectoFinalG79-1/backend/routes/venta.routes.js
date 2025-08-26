import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { createVenta, readVentaByUsuario, readVentaByVenta } from "../src/controllers/venta.controller.js"

const router = Router()

router.post('/venta', authMiddleware, createVenta)
router.get('/ventas/usuario/:id', authMiddleware, readVentaByUsuario)
router.get('/ventas/detalle/:id', authMiddleware, readVentaByVenta)

export default router
