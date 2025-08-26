import { findUserByEmailModel } from "../src/models/user.model.js";

const createUserMiddleware = async (req, res, next)=>{
    try {
        const {email} = req.body
        if(!email){
            return res.status(400).json({message: 'El email es obligatorio'})
        }
        const user = await findUserByEmailModel(email)
        if(user){
            return res.status(400).json({message: 'El usuario ya existe'})
        }
        next()
    } catch (error) {
        console.error('ERROR =>', error)
        res.status(500).json({error: 'Error al procesar la solicitud'})
    }
}

export {createUserMiddleware}