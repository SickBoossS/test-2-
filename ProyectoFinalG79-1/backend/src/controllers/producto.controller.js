import {
  createProductoModel,
  readAllProductosModel,
  readProductosPorCategoriaModel,
  updateProductoModel,
  updateSingleMTGModel, 
  deleteProductoModel,
  readProductByIdModel
} from "../models/producto.model.js"

export const createProducto = async (req, res) => {
  console.log('Llegó POST /api/producto con body:', req.body)
  try {
    const datosProducto = req.body
    const result = await createProductoModel(datosProducto)
    res.status(201).json({ producto: result })
  } catch (error) {
    console.error('ERROR_CONTROLLER_CREATE_PRODUCTO =>', error)
    res.status(500).json({ error: "Error al crear producto" })
  }
}

export const readAllProductos = async (req, res) => {
  try {
    const data = await readAllProductosModel()
    res.status(200).json(data) 
  } catch (error) {
    console.error('ERROR_CONTROLLER_GET_PRODUCTOS =>', error)
    res.status(500).json({ error: "Error al obtener productos" })
  }
}

export const readProductosPorCategoria = async (req, res) => {
  try {
    const { categoria } = req.params
    const data = await readProductosPorCategoriaModel(categoria)
    res.status(200).json(data)
  } catch (error) {
    console.error('ERROR_CONTROLLER_GET_PRODUCTOS_POR_CATEGORIA =>', error)
    res.status(500).json({ error: "Error al obtener productos por categoría" })
  }
}

// ✅ PATCH modificado para incluir actualización de campos MTG si corresponde
export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params
    const datos = req.body

    if (!id) {
      return res.status(400).json({ error: 'Falta el ID del producto' })
    }

    const result = await updateProductoModel(id, datos)

    // Lo cambié para ver si vienen campos MTG en el body...
    const camposMTG = ['rareza', 'edicion', 'tipo', 'color', 'foil']
    const tieneCamposMTG = camposMTG.some(campo => campo in datos)

    if (tieneCamposMTG) {
      await updateSingleMTGModel(id, datos)
    }

    res.status(200).json({ producto: result })
  } catch (error) {
    console.error('ERROR_CONTROLLER_UPDATE_PRODUCTO =>', error)
    res.status(500).json({ error: "Error al actualizar producto" })
  }
}

export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params
    const result = await deleteProductoModel(id)
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.status(200).json({ mensaje: "Producto eliminado correctamente" })
  } catch (error) {
    console.error('ERROR_CONTROLLER_DELETE_PRODUCTO =>', error)
    res.status(500).json({ error: "Error al eliminar producto" })
  }
}

export const readProductById = async (req, res) => {
  try {
    const { id } = req.params
    const data = await readProductByIdModel(id)
    res.status(200).json(data)  // acá no lo envuelvo en objeto para facilitar front
  } catch (error) {
    console.error('ERROR_CONTROLLER_GET_PRODUCT_BY_ID =>', error)
    res.status(500).json({ error: "Error al obtener productos" })
  }
}
