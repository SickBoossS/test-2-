import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ProductosContext } from '../../context/ProductosContext';
import CardItem from '../../components/CardItem/CardItem';
import { CartContext } from '../../context/CartContext';
import './ItemDetails.css';

const ItemDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { itemId } = useParams();
  const { allproductos } = useContext(ProductosContext);

  if (!allproductos || allproductos.length === 0) {
    return <div className="text-center my-5">Cargando productos...</div>;
  }

  const producto = allproductos.find(p => String(p.id_producto) === String(itemId));

  if (!producto) {
    return <div className="text-center my-5">
      Producto no encontrado con ID: {itemId}</div>;
  }

  return (
    <div className="container mt-5 item-details-container">
      <div className="text-center mb-4">
        <h2 className="display-5 fw-bold">{producto.nombre}</h2>
      </div>

      <div className="row justify-content-center">
        {producto.categoria === "single_mtg" ? (
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-6 mb-4">
                <CardItem
                  producto={producto}
                  addToCart={() => addToCart(producto)}
                  hideVerMas={true}
                />
              </div>
              <div className="col-md-6 mb-4 mt-4">
                <div className="item-extra-info p-1 shadow-sm rounded h-50">
                  <ul className="list-group mt-4">
                    <li className="list-group-item">
                      <strong>Rareza:</strong> {producto.rareza}</li>
                    <li className="list-group-item">
                      <strong>Edición:</strong> {producto.edicion}</li>
                    <li className="list-group-item">
                      <strong>Color:</strong> {producto.color}</li>
                    <li className="list-group-item">
                      <strong>Tipo:</strong> {producto.tipo}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-md-8 mb-4">
            <CardItem
              producto={producto}
              addToCart={() => addToCart(producto)}
              hideVerMas={true}
            />
          </div>
        )}
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <div className="item-description p-4 shadow-lg rounded">
            <h4 className="mb-3">Descripción:</h4>
            <p>{producto.descripcion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;

