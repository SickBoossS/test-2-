import { Router }  from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createCategoria, readAllCategoria, readCategoriaActivo, updateCategoria } from "../src/controllers/categoria.controller.js";


const router = Router()

//No está el delete ya que solo se realiza cambio de estado para mantener historia en la data
router.post('/categoria', authMiddleware, createCategoria)
router.get('/categoria', authMiddleware,readCategoriaActivo)
router.get('/categorias', readAllCategoria)
router.patch('/categoria/:id', authMiddleware, updateCategoria)

export default router