import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductosContext } from '../../context/ProductosContext';
import { CartContext } from '../../context/CartContext';
import CardItem from '../../components/CardItem/CardItem';
import Iconos from '../../components/Iconos/Iconos';
import './Productos.css';

const Productos = () => {
  const { categoria } = useParams();
  const { allproductos } = useContext(ProductosContext);
  const { addToCart } = useContext(CartContext);

  const productosFiltrados = allproductos
    .filter(
      (p) =>
        p.categoria && p.categoria.toLowerCase() === categoria.toLowerCase()
    )
    .sort((a, b) =>
      a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
    );

  return (
    <div>
      <div className="iconos-wrapper-productos">
        <Iconos />
      </div>
      {productosFiltrados.length ? (
        <div
          className="productos-list">
          {productosFiltrados.map(producto => (
            <CardItem
              key={producto.id_producto}
              producto={producto}
              addToCart={() => addToCart(producto)}
              hideVerMas={false}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No hay productos en esta categoría: {categoria}</p>
      )}
    </div>
  );
};

export default Productos;
