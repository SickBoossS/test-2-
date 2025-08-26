import { Router }  from "express";
import { informationUser, loginUser } from "../src/controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router()

router.post('/auth/login', loginUser)
router.get('/auth/me', authMiddleware, informationUser)
// router.get("/me", authMiddleware, authController.me);

export default router