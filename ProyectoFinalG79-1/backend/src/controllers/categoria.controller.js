import { createCategoriaModel, readAllCategoriaModel, readCategoriaActivoModel, updateCategoriaModel } from "../models/categoria.model.js"

export const createCategoria = async (req, res) => {
    try {
        const { descripcion } = req.body
        const result = await createCategoriaModel(descripcion)
        res.status(200).json({ user: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_REGISTER =>', error)
    }
}

export const readAllCategoria = async (req, res) => {
    try {
        const data = await readAllCategoriaModel()
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_GET =>', error)
    }
}

export const readCategoriaActivo = async (req, res) => {
    try {
        const data = await readCategoriaActivoModel()
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_GET =>', error)
    }
}

export const updateCategoria = async (req, res) => {
    try {
        const {id} = req.params
        const {descripcion, estado } = req.body
        const result = await updateCategoriaModel(id, descripcion, estado)
        res.status(200).json({ user: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_UPDATE =>', error)
    }
}