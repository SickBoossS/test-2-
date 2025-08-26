import { findUserByEmailModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

import 'dotenv/config'

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await findUserByEmailModel(email)
        if (!user) {
            res
                .status(404)
                .json({ message: 'El usuario o password son incorrectos' })
        }
        //llamar a bcrypjs para comparar el password
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
            res.status(404).json({ message: 'No autorizado' })
        }

        //generar el TOKEN
        //1h= 1 hora  1d = 1 día  1y= 1 año  340d= 340 daias  120d
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
        const { password: _, ...userWithoutPass } = user
        res.status(200).json({ token, userWithoutPass })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.error('ERROR =>', error)
    }
}

export const informationUser = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await findUserByEmailModel(email);
        return res.json({
            email: user.email,
            id: user.id_usuario,
            nombre: user.nombre,
            apellido: user.apellido,
            rut: user.rut,
            telefono: user.telefono,
            img: user.img,
            rol: {
                id_rol: user.id_rol,
                descripcion: user.rol_descripcion
            }
        });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
};
