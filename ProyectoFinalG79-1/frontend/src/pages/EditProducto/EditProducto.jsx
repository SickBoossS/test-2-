import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { ProductosContext } from '../../context/ProductosContext';
import { useNavigate } from 'react-router-dom';
import AdminCardProducto from '../../components/AdminCardProducto/AdminCardProducto';
import Swal from 'sweetalert2';

const EditProducto = () => {
  const { userData, token } = useContext(UserContext);
  const { allproductos, categorias, refreshProductos } = useContext(ProductosContext);
  const navigate = useNavigate();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  const productosFiltrados = categoriaSeleccionada
    ? allproductos.filter((p) => p.id_categoria === parseInt(categoriaSeleccionada))
    : allproductos;

  useEffect(() => {
    if (!userData || userData.rol?.id_rol !== 1) {
      navigate('/');
    }
  }, [userData, navigate]);

  const handleEditClick = (producto) => {
    setProductoSeleccionado(producto);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductoSeleccionado((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://proyectofinalg79-1.onrender.com/api/producto/${productoSeleccionado.id_producto}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productoSeleccionado),
      });

      if (!res.ok) throw new Error('Error al actualizar producto');

      Swal.fire('Actualizado', 'Producto actualizado correctamente', 'success');
      refreshProductos();
      setProductoSeleccionado(null);
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://proyectofinalg79-1.onrender.com/api/producto/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Error al eliminar');

        Swal.fire('Borrado!', 'El producto fue eliminado.', 'success');
        refreshProductos();
      } catch (error) {
        Swal.fire('Error', error.message, 'error');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <h2 className="mb-3 mb-md-0">Panel de Administración de Productos:</h2>
        <div className="col-md-4 mt-2">
          <select
            className="form-select mx-auto d-block"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.descripcion}
              </option>
            ))}
          </select>
        </div>
      </div>

      {productoSeleccionado ? (
        <div className="card p-4 shadow-lg">
          <h4 className="mb-3">Editando: {productoSeleccionado.nombre}</h4>

          <h5 className="mt-3">Información General:</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <span>Nombre:</span>
              <input
                className="form-control"
                name="nombre"
                value={productoSeleccionado.nombre || ''}
                onChange={handleChange}
                placeholder="Nombre"
              />
            </div>
            <div className="col-md-6 mb-3">
              <span>Descripción:</span>
              <input
                className="form-control"
                name="descripcion"
                value={productoSeleccionado.descripcion || ''}
                onChange={handleChange}
                placeholder="Descripción"
              />
            </div>
            <div className="col-md-4 mb-3">
              <span>Idioma:</span>
              <input
                className="form-control"
                name="idioma"
                value={productoSeleccionado.idioma || ''}
                onChange={handleChange}
                placeholder="Idioma"
              />
            </div>
            <div className="col-md-4 mb-3">
              <span>Precio de venta:</span>
              <input
                className="form-control"
                type="number"
                name="precio_venta"
                value={productoSeleccionado.precio_venta || ''}
                onChange={handleChange}
                placeholder="Precio Venta"
              />
            </div>
            <div className="col-md-4 mb-3">
              <span>Descuento %:</span>
              <input
                className="form-control"
                type="number"
                name="descuento"
                value={productoSeleccionado.descuento || ''}
                onChange={handleChange}
                placeholder="Descuento (%)"
              />
            </div>
            <div className="col-md-6 mb-3">
              <span>Imagen:</span>
              <input
                className="form-control"
                name="img"
                value={productoSeleccionado.img || ''}
                onChange={handleChange}
                placeholder="URL de Imagen"
              />
            </div>
            <div className="col-md-6 mb-3">
              <span>Estado:</span>
              <input
                className="form-control"
                name="estado"
                value={productoSeleccionado.estado || ''}
                onChange={handleChange}
                placeholder="Estado del producto"
              />
            </div>
          </div>

          {(productoSeleccionado.categoria === 'single_mtg' || productoSeleccionado.id_categoria === 1) && (
            <>
              <h5 className="mt-4">Detalles de Magic The Gathering:</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <span>Rareza:</span>
                  <input
                    className="form-control"
                    name="rareza"
                    value={productoSeleccionado.rareza || ''}
                    onChange={handleChange}
                    placeholder="Rareza"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <span>Edición:</span>
                  <input
                    className="form-control"
                    name="edicion"
                    value={productoSeleccionado.edicion || ''}
                    onChange={handleChange}
                    placeholder="Edición"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <span>Tipo de carta:</span>
                  <input
                    className="form-control"
                    name="tipo"
                    value={productoSeleccionado.tipo || ''}
                    onChange={handleChange}
                    placeholder="Tipo"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <span>Color:</span>
                  <select
                    className="form-select"
                    name="color"
                    value={productoSeleccionado.color || ''}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona Color</option>
                    <option value="azul">Azul</option>
                    <option value="blanco">Blanco</option>
                    <option value="negro">Negro</option>
                    <option value="rojo">Rojo</option>
                    <option value="verde">Verde</option>
                    <option value="incoloro">Incoloro</option>
                    <option value="multicolor">Multicolor</option>
                  </select>
                </div>
                <div className="col-md-12 mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="foilCheckbox"
                    name="foil"
                    checked={productoSeleccionado.foil || false}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="foilCheckbox">
                    ¿Es foil?
                  </label>
                </div>
              </div>
            </>
          )}

          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-success me-2" onClick={handleUpdate}>
              💾 Guardar Cambios
            </button>
            <button className="btn btn-secondary" onClick={() => setProductoSeleccionado(null)}>
              ❌ Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="row mt-4">
          {productosFiltrados.map((p) => (
            <div className="col-md-4 mb-3" key={p.id_producto}>
              <AdminCardProducto
                producto={p}
                onEdit={handleEditClick}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditProducto;
