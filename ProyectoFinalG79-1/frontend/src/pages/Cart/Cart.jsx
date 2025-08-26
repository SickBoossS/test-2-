import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';

const Cart = () => {
  const { cart, updateQuantity, total, removeFromCart } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const [tipoEntrega, setTipoEntrega] = useState('');
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!token) {
      Swal.fire('Error', 'Debes iniciar sesión para realizar la compra.', 'error');
      return;
    }

    if (!tipoEntrega) {
      Swal.fire('Atención', 'Debes seleccionar un tipo de entrega.', 'warning');
      return;
    }

    // GUARDAMOS EN SESSIONSTORAGE
    sessionStorage.setItem('checkout_cart', JSON.stringify(cart));
    sessionStorage.setItem('checkout_tipoEntrega', tipoEntrega);

    // Aquí se redirige a Checkout enviando datos
    navigate('/checkout', { state: { cart, tipoEntrega } });
  };

  const confirmRemove = (id_producto) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminará el producto del carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id_producto);
        Swal.fire('Eliminado', 'El producto ha sido eliminado del carrito.', 'success');
      }
    });
  };

  return (
    <div className="container mt-3 mx-auto container-custom">
      <h2 className="text-center mb-4">Detalles del Pedido:</h2>
      <div className="row justify-content-center">
        {cart.length === 0 ? (
          <p className="text-center">El carrito está vacío.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id_producto} className="col-12 mb-4">
              <div className="d-flex flex-column flex-md-row align-items-center border p-3 rounded shadow-sm justify-content-between">
                <img
                  src={item.img}
                  alt={item.nombre}
                  className="img-fluid rounded mb-3 mb-md-0 item-img"
                />
                <div className="ms-md-2 me-0 me-md-auto item-info mb-3 mb-md-0">
                  <h5 className="text-truncate item-name text-capitalize">{item.nombre}:</h5>
                </div>
                <div className="ms-3 d-flex align-items-center">
                  <span className="d-block d-block-price me-3">
                    ${(Number(item.precio_venta) * item.count).toLocaleString()}
                  </span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => updateQuantity(item.id_producto, -1)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.count}</span>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => updateQuantity(item.id_producto, 1)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-warning btn-sm ms-2"
                    onClick={() => confirmRemove(item.id_producto)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4">
        <h5>Tipo de entrega</h5>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="tipoEntrega"
            id="retiro"
            value="retiro"
            onChange={(e) => setTipoEntrega(e.target.value)}
          />
          <label className="form-check-label" htmlFor="retiro">
            Retiro en tienda
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="tipoEntrega"
            id="envio"
            value="envio"
            onChange={(e) => setTipoEntrega(e.target.value)}
          />
          <label className="form-check-label" htmlFor="envio">
            Envío por cobrar
          </label>
        </div>
      </div>

      <div className="text-center mt-1">
        <h3>Total: ${total.toLocaleString()}</h3>
        <button
          className="btn btn-success mt-3 mb-2"
          disabled={!token}
          onClick={handleCheckout}
        >
          {token ? 'Pagar' : 'Inicia sesión para pagar'}
        </button>
      </div>
    </div>
  );
};

export default Cart;
