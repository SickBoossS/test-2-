import { Router }  from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createRegion, deleteRegion, readAllRegion, updateRegion } from "../src/controllers/region.controller.js";

const router = Router()

router.post('/region', authMiddleware, createRegion)
router.get('/region', authMiddleware,readAllRegion)
router.patch('/region/:id', authMiddleware, updateRegion)
router.delete('/region/:id', authMiddleware, deleteRegion)

export default router