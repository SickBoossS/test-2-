import { 
  createVentaDetalleModel, 
  createVentaModel, 
  readVentaByUsuarioModel, 
  readVentaByVentaModel 
} from "../models/venta.model.js";

export const createVenta = async (req, res) => {
  try {
    const { id_usuario, descripcion, tipoEntrega, direccionEnvio, detalle } = req.body;

    if (!id_usuario || !descripcion || !tipoEntrega || !direccionEnvio || !Array.isArray(detalle) || detalle.length === 0) {
      return res.status(400).json({ message: 'Datos incompletos o inválidos para crear la venta' });
    }

    const venta = await createVentaModel(id_usuario, descripcion, tipoEntrega, direccionEnvio);
    if (!venta || venta.length === 0) {
      return res.status(500).json({ message: 'Error al crear la venta' });
    }

    const id_venta = venta[0].id_venta;
    const resultadosDetalle = [];

    for (const producto of detalle) {
      const { id_producto, cantidad, precio_venta, descuento = 0, precio_final } = producto;
      if (!id_producto || !cantidad || !precio_venta || precio_final == null) {
        return res.status(400).json({ message: 'Detalle de producto incompleto o inválido' });
      }

      const detalleInsertado = await createVentaDetalleModel(
        id_venta,
        id_producto,
        cantidad,
        precio_venta,
        descuento,
        precio_final
      );
      resultadosDetalle.push(detalleInsertado[0]);
    }

    return res.status(201).json({
      venta: venta[0],
      detalle: resultadosDetalle
    });

  } catch (error) {
    console.error('ERROR_CONTROLLER_CREATE =>', error);
    return res.status(500).json({ error: 'Error interno al procesar la solicitud' });
  }
};

export const readVentaByUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID de usuario requerido' });

    const data = await readVentaByUsuarioModel(id);
    return res.status(200).json({ data });
  } catch (error) {
    console.error('ERROR_CONTROLLER_GET_BY_USUARIO =>', error);
    return res.status(500).json({ error: 'Error interno al procesar la solicitud' });
  }
};

export const readVentaByVenta = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID de venta requerido' });

    const data = await readVentaByVentaModel(id);
    return res.status(200).json({ data });
  } catch (error) {
    console.error('ERROR_CONTROLLER_GET_BY_ID =>', error);
    return res.status(500).json({ error: 'Error interno al procesar la solicitud' });
  }
};
