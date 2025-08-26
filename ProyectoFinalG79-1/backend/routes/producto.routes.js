import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import {
  createProducto,
  readAllProductos,
  readProductById,
  readProductosPorCategoria,
  updateProducto,
  deleteProducto
} from "../src/controllers/producto.controller.js"

const router = Router()

router.post('/producto',authMiddleware, createProducto)
router.get('/productos', readAllProductos)
router.get('/producto/:id', authMiddleware, readProductById)
router.get('/productos/:categoria', readProductosPorCategoria)
router.patch('/producto/:id', authMiddleware, updateProducto)
router.delete('/producto/:id', authMiddleware, deleteProducto)

export default router
