import { createCarouselModel, deleteCarouselModel, readCarouselModel } from "../models/carousel.model.js"

export const createCarousel = async (req, res) => {
    try {
        const { img } = req.body
        const result = await createCarouselModel(img)
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_CREATE =>', error)
    }
}

export const readCarousel = async (req, res) => {
    try {
        const data = await readCarouselModel()
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_GET =>', error)
    }
}

export const deleteCarousel = async (req, res) => {
    try {
        const {id} = req.params
        const result = await deleteCarouselModel(id)
        res.status(200).json({ user: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_DELETE =>', error)
    }
}