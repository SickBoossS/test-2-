import { createRegionModel, deleteRegionModel, readAllRegionModel, updateRegionModel } from "../models/region.model.js"

export const createRegion = async (req, res) => {
    try {
        const { descripcion } = req.body
        const result = await createRegionModel(descripcion)
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_REGISTER =>', error)
    }
}

export const readAllRegion = async (req, res) => {
    try {
        const data = await readAllRegionModel()
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_GET =>', error)
    }
}

export const updateRegion = async (req, res) => {
    try {
        const {id} = req.params
        const {descripcion } = req.body
        const result = await updateRegionModel(id, descripcion)
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_UPDATE =>', error)
    }
}

export const deleteRegion = async (req, res) => {
    try {
        const {id} = req.params
        const result = await deleteRegionModel(id)
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_DELETE =>', error)
    }
}