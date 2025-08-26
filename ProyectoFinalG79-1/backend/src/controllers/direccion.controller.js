import { createDireccionModel, deleteDireccionModel, getDireccionByIdDireccionModel, getDireccionByUserModel, updateDireccionModel } from "../models/direccion.model.js"

export const createDireccion = async (req, res) => {
    try {
        const { id_usuario,direccion, numero, anexo, id_region, id_comuna } = req.body
        const result = await createDireccionModel(id_usuario,direccion, numero, anexo, id_region, id_comuna)
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_REGISTER =>', error)
    }
}

export const getDireccionByUser = async (req, res) => {
    try {
        const { id } = req.params
        const data = await getDireccionByUserModel(id)
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_GET =>', error)
    }
}

export const getDireccionByIdDireccion = async (req, res) => {
    try {
        const {id} = req.params
        const data = await getDireccionByIdDireccionModel(id)
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_GET =>', error)
    }
}

export const updateDireccion = async (req, res) => {
    try {
        const {id} = req.params
        const {direccion, numero, anexo, id_region, id_comuna } = req.body
        const result = await updateDireccionModel(id, direccion, numero, anexo, id_region, id_comuna)
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_UPDATE =>', error)
    }
}

export const deleteDireccion = async (req, res) => {
    try {
        const {id} = req.params
        const result = await deleteDireccionModel(id)
        res.status(200).json({ user: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_DELETE =>', error)
    }
}