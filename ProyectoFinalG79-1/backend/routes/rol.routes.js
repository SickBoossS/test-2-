import { Router }  from "express";
import { createRol, readAllRol, readRolActivo, updateRol } from "../src/controllers/rol.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = Router()

//No está el delete ya que solo se realiza cambio de estado para mantener historia en la data
router.post('/rol', authMiddleware, createRol)
router.get('/rol', authMiddleware,readRolActivo)
router.get('/rols', authMiddleware, readAllRol)
router.patch('/rol/:id', authMiddleware, updateRol)

export default router