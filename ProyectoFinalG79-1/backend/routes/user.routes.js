import { Router }  from "express";
import { createUser, getUserById, updateUser } from "../src/controllers/user.controller.js";
import { createUserFav, deleteUserFav, readUserFav } from "../src/controllers/userFav.controller.js";
import { createUserMiddleware } from "../middleware/user.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router()
router.post('/auth/register', createUserMiddleware, createUser)
router.get('/user/:id', getUserById)
router.patch('/user/:id', authMiddleware, updateUser)
/*
**Rutas para agregar los productos a favoritos del usuario
** Metoddos Post y Delete para id_usuario y id_producto por body
** Metodo get para id_usuario por parámetro
*/
router.post('/user/fav', authMiddleware, createUserFav)
router.get('/user/fav/:id', authMiddleware, readUserFav)
router.delete('/user/fav', authMiddleware, deleteUserFav)

export default router