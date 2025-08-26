import { Router }  from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createCarousel, deleteCarousel, readCarousel } from "../src/controllers/carousel.controller.js";


const router = Router()

router.post('/carousel', authMiddleware, createCarousel)
router.get('/carousel', authMiddleware,readCarousel)
router.delete('/carousel/:id', authMiddleware, deleteCarousel)

export default router