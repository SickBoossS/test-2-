import { Router }  from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createComuna, deleteComuna, readAllComuna,  readComunaByRegion, updateComuna } from "../src/controllers/comuna.controller.js";


const router = Router()

router.post('/comuna', authMiddleware, createComuna)
router.get('/comuna', authMiddleware,readAllComuna)
router.get("/comuna/region/:id_region", authMiddleware, readComunaByRegion);
router.patch('/comuna/:id', authMiddleware, updateComuna)
router.delete('/comuna/:id', authMiddleware, deleteComuna)


export default router