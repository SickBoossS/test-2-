import { useState, useEffect, useContext } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { ProductosContext } from '../../context/ProductosContext';
import './Ordenes.css';

export const Ordenes = () => {
  const { token } = useContext(UserContext);
  const { allproductos } = useContext(ProductosContext);

  const [ordenes, setOrdenes] = useState([]);
  const [detalles, setDetalles] = useState({});
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const toggleDetalles = async (id_venta) => {
    if (!detalles[id_venta]) {
      try {
        const res = await fetch(
          `https://proyectofinalg79-1.onrender.com/api/ventas/detalle/${id_venta}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { data } = await res.json();

        const datosConNombre = data.map(det => {
          const p = allproductos.find(prod => prod.id_producto === det.id_producto);
          return {
            ...det,
            nombre: p?.nombre || `Producto ${det.id_producto}`
          };
        });

        setDetalles(prev => ({ ...prev, [id_venta]: datosConNombre }));
      } catch (err) {
        console.error('Error al cargar detalles:', err);
        return;
      }
    }
    setVentaSeleccionada(id_venta);
    setMostrarModal(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const { id } = JSON.parse(localStorage.getItem('user') || '{}');
        const res = await fetch(
          `https://proyectofinalg79-1.onrender.com/api/ventas/usuario/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { data } = await res.json();
        setOrdenes(data);
      } catch (err) {
        console.error('Error al cargar las órdenes:', err);
      }
    })();
  }, [token]);

  return (
    <div className="ordenes-wrapper mt-4">
      <h2 className="text-center mb-4">Detalles del pedido</h2>

      {ordenes.length === 0 ? (
        <p className="text-center">No hay pedidos para mostrar.</p>
      ) : (
        <table className="table ordenes-table">
          <thead>
            <tr>
              <th># Orden</th>
              <th>Fecha compra:</th>
              <th>Tipo entrega:</th>
              <th>Dirección:</th>
              <th>Total:</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map(o => (
              <tr key={o.id_venta}>
                <td data-label="# Orden">{o.id_venta}</td>
                <td>{o.fecha_venta}</td>
                <td>{o.tipo_entrega}</td>
                <td className="text-truncate direccion-col" title={o.direccion_envio}>
                  {o.direccion_envio}
                </td>
                <td data-label="Total:">
                  {(Number(o.total_venta) || 0).toLocaleString('es-CL')}</td>

                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    className="detalle-btn"
                    onClick={() => toggleDetalles(o.id_venta)}
                  >
                    Ver detalles
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal de detalles */}
      <Modal
        show={mostrarModal}
        onHide={() => setMostrarModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Detalles Orden#{ventaSeleccionada}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ventaSeleccionada && detalles[ventaSeleccionada] ? (
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Qty.</th>
                  <th>Precio</th>
                  <th>Dcto.</th>
                  <th>Precio Final</th>
                </tr>
              </thead>
              <tbody>
                {detalles[ventaSeleccionada].map(det => (
                  <tr key={det.id_venta_detalle}>
                    <td>{det.nombre}</td>
                    <td>{det.cantidad}</td>
                    <td>{(Number(det.precio_venta) || 0).toLocaleString('es-CL')}</td>
                    <td>{det.descuento.toLocaleString()}</td>
                    <td>{(Number(det.precio_final) || 0).toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Cargando detalles...</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Ordenes;
