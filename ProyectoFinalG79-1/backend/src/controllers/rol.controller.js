import { createRolModel, readAllRolModel, readRolActivoModel, updateRolModel } from "../models/rol.model.js"

export const createRol = async (req, res) => {
    try {
        const { descripcion } = req.body
        const result = await createRolModel(descripcion)
        res.status(200).json({ user: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_REGISTER =>', error)
    }
}

export const readAllRol = async (req, res) => {
    try {
        const data = await readAllRolModel()
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_GET =>', error)
    }
}

export const readRolActivo = async (req, res) => {
    try {
        const data = await readRolActivoModel()
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_GET =>', error)
    }
}

export const updateRol = async (req, res) => {
    try {
        const {id} = req.params
        const {descripcion, estado } = req.body
        const result = await updateRolModel(id, descripcion, estado)
        res.status(200).json({ user: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_UPDATE =>', error)
    }
}