import { Router }  from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createInventario, deleteInventario, readInventario, readInventarioByProducto } from "../src/controllers/inventario.controller.js";


const router = Router()

router.post('/inventario', authMiddleware, createInventario)
router.get('/inventario', authMiddleware,readInventario)
router.get('/inventario/:id', authMiddleware,readInventarioByProducto)
router.delete('/inventario/:id', authMiddleware, deleteInventario)

export default router