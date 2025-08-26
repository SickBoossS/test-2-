import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import Swal from "sweetalert2";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { clearCart } = useContext(CartContext);


  const [cart, setCart] = useState([]);
  const [tipoEntrega, setTipoEntrega] = useState("");
  const [direccionEnvio, setDireccionEnvio] = useState(null); // objeto dirección o null
  const [loading, setLoading] = useState(false);

  // Guardar en sessionStorage cada vez que cambian cart o tipoEntrega
  useEffect(() => {
    if (cart.length > 0) {
      sessionStorage.setItem("checkout_cart", JSON.stringify(cart));
    }
    if (tipoEntrega) {
      sessionStorage.setItem("checkout_tipoEntrega", tipoEntrega);
    }
  }, [cart, tipoEntrega]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const savedCart = sessionStorage.getItem("checkout_cart");
    const savedTipoEntrega = sessionStorage.getItem("checkout_tipoEntrega");

    const cartFromStateOrStorage = state?.cart || (savedCart ? JSON.parse(savedCart) : null);
    const tipoEntregaFromStateOrStorage = state?.tipoEntrega || savedTipoEntrega;

    if (!cartFromStateOrStorage || !tipoEntregaFromStateOrStorage) {
      navigate("/cart");
      return;
    }

    setCart(cartFromStateOrStorage);
    setTipoEntrega(tipoEntregaFromStateOrStorage);

    if (tipoEntregaFromStateOrStorage === "envio" && !state?.direccionEnvio) {
      navigate("/profile/address", {
        state: { fromCheckout: true, cart: cartFromStateOrStorage, tipoEntrega: tipoEntregaFromStateOrStorage },
      });
    } else if (state?.direccionEnvio) {
      setDireccionEnvio(state.direccionEnvio);
    }
  }, [state, navigate, token]);

  const total = cart.reduce(
    (acc, item) => acc + Number(item.precio_venta) * item.count,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tipoEntrega === "envio" && !direccionEnvio) {
      Swal.fire(
        "Atención",
        "Debes seleccionar una dirección de envío antes de confirmar.",
        "warning"
      );
      return;
    }

    setLoading(true);

    const finalizarCompra = () => {
      // Limpiar sessionStorage tras compra exitosa
      sessionStorage.removeItem("checkout_cart");
      sessionStorage.removeItem("checkout_tipoEntrega");
      sessionStorage.removeItem("cart");
      clearCart()
      Swal.fire("¡Éxito!", "Compra realizada con éxito. 🎉", "success");
    }

    try {

      const user = localStorage.getItem("user");
      const { id } = JSON.parse(user);
      const descripcion = `Compra realizada el ${new Date().toLocaleDateString('es-CL')}`;

      // Transforma el carrito en el detalle
      const detalle = cart.map(item => {
        const cantidad = Number(item.count) || 1;
        const precio_venta = Number(item.precio_venta) || 0;
        const descuento = Number(item.descuento) || 0;
        const precio_final = (precio_venta - descuento) * cantidad;

        return {
          id_producto: item.id_producto,
          cantidad,
          precio_venta,
          descuento,
          precio_final
        };
      });

      let direccionDeEnvio = ''
      if(tipoEntrega === "envio"){
        direccionDeEnvio = `${direccionEnvio.direccion} ${direccionEnvio.numero} ${direccionEnvio.anexo}`
      }  else{
        direccionDeEnvio = 'Local'
      }    
    
      // Construye el objeto final que tensdrá todos los datos
      const orden = {
        id_usuario: id,
        descripcion,
        tipoEntrega,
        direccionEnvio: direccionDeEnvio,
        detalle
      };

      console.log(JSON.stringify(orden, null, 2));

      const response = await fetch("https://proyectofinalg79-1.onrender.com/api/venta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          orden
        ),
      });

      if (!response.ok) throw new Error("Error en el proceso de compra.");

      finalizarCompra()

      navigate("/"); // o a la página que desees después de la compra
    } catch (error) {
      console.error("Error en checkout:", error);
      Swal.fire("Error", "Hubo un problema al procesar la compra.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Confirmar Compra</h2>

      <div className="mb-3">
        <h5>Resumen del pedido:</h5>
        <ul className="list-group">
          {cart.map((item) => (
            <li
              key={item.id_producto}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.nombre} x {item.count}
              <span>${(Number(item.precio_venta) * item.count).toLocaleString()}</span>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between">
            <strong>Total:</strong>
            <strong>${total.toLocaleString()}</strong>
          </li>
        </ul>
      </div>

      <div className="mb-3">
        <h5>Tipo de entrega:</h5>
        <p className="text-capitalize">
          {tipoEntrega === "retiro" ? "Retiro en tienda" : "Envío por cobrar"}
        </p>
      </div>

      {tipoEntrega === "envio" && (
        <div className="mb-3">
          <h5>Dirección de envío seleccionada:</h5>
          {direccionEnvio ? (
            <div>
              <p>
                {direccionEnvio.direccion} Nº {direccionEnvio.numero}{" "}
                {direccionEnvio.anexo ? `, ${direccionEnvio.anexo}` : ""}
              </p>
              <button
                className="btn btn-link p-0"
                onClick={() =>
                  navigate("/profile/address", {
                    state: { fromCheckout: true, cart, tipoEntrega },
                  })
                }
              >
                Cambiar dirección
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/profile/address", {
                  state: { fromCheckout: true, cart, tipoEntrega },
                })
              }
            >
              Seleccionar dirección
            </button>
          )}
        </div>
      )}

      {tipoEntrega === "envio" && !direccionEnvio && (
        <p className="text-danger">
          Debes seleccionar una dirección para continuar con el envío.
        </p>
      )}

      <button
        onClick={handleSubmit}
        className="btn btn-success"
        disabled={loading}
      >
        {loading ? "Procesando..." : "Confirmar Compra"}
      </button>
    </div>
  );
};

export default Checkout;
