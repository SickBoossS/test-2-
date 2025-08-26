import { createUserFavModel, deleteUserFavModel, readUserFavModel } from "../models/userFav.model.js"

export const createUserFav = async (req, res) => {
    try {
        const { id_usuario, id_producto } = req.body
        const result = await createUserFavModel(id_usuario, id_producto)
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_CREATE =>', error)
    }
}

export const readUserFav = async (req, res) => {
    try {
        const { id } = req.params
        const data = await readUserFavModel(id)
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_GET =>', error)
    }
}

export const deleteUserFav = async (req, res) => {
    try {
        const { id_usuario, id_producto } = req.body
        const result = await deleteUserFavModel(id_usuario, id_producto)
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_DELETE =>', error)
    }
}