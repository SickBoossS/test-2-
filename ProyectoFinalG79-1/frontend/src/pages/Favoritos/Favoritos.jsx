import { useContext, useEffect } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import CardItem from "../../components/CardItem/CardItem";
import { CartContext } from "../../context/CartContext";

const Favoritos = () => {
  const { favorites, favoritesArray } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);

  if (favorites.length === 0) {
    return <h2 className="text-center mt-5">No tienes productos en favoritos.</h2>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Tus Favoritos ❤️</h2>
      <div className="row" >
        {favoritesArray.map((product) => (
          <div className="col-md-4 mb-3" key={product.id_producto}>
            <CardItem
              producto={product}
              addToCart={() => addToCart(product)}
              hideVerMas={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoritos;
