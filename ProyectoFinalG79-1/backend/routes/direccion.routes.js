import { Router }  from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createDireccion, deleteDireccion, getDireccionByIdDireccion, getDireccionByUser, updateDireccion } from "../src/controllers/direccion.controller.js";

const router = Router()
router.post('/direccion', authMiddleware, createDireccion)
router.get('/direccion/:id', authMiddleware, getDireccionByIdDireccion)
router.get('/direcciones/:id', authMiddleware, getDireccionByUser)
router.patch('/direccion/:id', authMiddleware, updateDireccion)
router.delete('/direccion/:id', authMiddleware, deleteDireccion)

export default router