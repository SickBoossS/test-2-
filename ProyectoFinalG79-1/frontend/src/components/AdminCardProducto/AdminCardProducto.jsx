import './AdminCardProducto.css';

const AdminCardProducto = ({ producto, onEdit, onDelete, onStock }) => {
    return (
        <div className="card admin-card mb-3">
            <div className="d-flex align-items-start gap-3">
                <div className="admin-img-wrapper">
                    <img
                        src={producto.img}
                        alt={producto.nombre}
                        className="admin-img"
                    />
                </div>
                <div className="flex-grow-1 d-flex flex-column justify-content-between admin-text-container">
                    <div>
                        <h5 className="mb-1 admin-title">{producto.nombre}</h5>

                        <p className="mb-1 admin-descripcion">
                            {producto.descripcion}
                        </p>
                        <p className="mb-1"><strong>Stock:</strong> {producto.stock}</p>
                        <p className="mb-2 fw-bold">
                            <strong>Precio:</strong> ${Number(producto.precio_venta).toLocaleString()}
                        </p>
                    </div>
                    <div className="admin-buttons">
                        <button className="btn btn-sm btn-success admin-stock-btn" onClick={() => onStock(producto)}>
                            - Stock +
                        </button>

                        <button className="btn btn-sm btn-primary" onClick={() => onEdit(producto)}>
                            Editar
                        </button>
                        <button className="btn btn-sm btn-danger me-2" onClick={() => onDelete(producto.id_producto)}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCardProducto;
