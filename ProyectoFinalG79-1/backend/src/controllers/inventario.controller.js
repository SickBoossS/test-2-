import { createInventarioModel, deleteInventarioModel, readInventarioByProductoModel, readInventarioModel } from "../models/inventario.model.js"

export const createInventario = async (req, res) => {
    try {
        const { id_producto, precio_compra, cantidad } = req.body
        const result = await createInventarioModel(id_producto, precio_compra, cantidad)
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_CREATE =>', error)
    }
}

export const readInventario = async (req, res) => {
    try {
        const data = await readInventarioModel()
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_GET =>', error)
    }
}

export const readInventarioByProducto = async (req, res) => {
    try {
        const {id} = req.params
        const data = await readInventarioByProductoModel(id)
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_GET_BY_ID =>', error)
    }
}

export const deleteInventario = async (req, res) => {
    try {
        const {id} = req.params
        const result = await deleteInventarioModel(id)
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_DELETE =>', error)
    }
}