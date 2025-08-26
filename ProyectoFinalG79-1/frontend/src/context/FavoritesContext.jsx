import { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { ProductosContext } from "./ProductosContext";

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesArray, setFavoritesArray] = useState([]);
  const { token } = useContext(UserContext)
  const { fetchProductoById } = useContext(ProductosContext);

  const agregarFavorito = async (producto) => {
    try {
      console.log(producto)
      const user = localStorage.getItem("user");
      const { id } = JSON.parse(user)
      const res = await fetch("https://proyectofinalg79-1.onrender.com/api/user/fav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_usuario: id,
          id_producto: producto.id_producto
        }),
      });

      const data = await res.json();
      getAllFavoritos();
    } catch (error) {
      console.error("Error al cargar favoritos:", error)
    }
  };

  const quitarFavorito = async (producto) => {
    try {
      const user = localStorage.getItem("user");
      const { id } = JSON.parse(user)
      const res = await fetch("https://proyectofinalg79-1.onrender.com/api/user/fav", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_usuario: id,
          id_producto: producto.id_producto
        }),
      });

      const data = await res.json();
      await getAllFavoritos();
    } catch (error) {
      console.error("Error al cargar favoritos:", error)
    }
  };

  const getAllFavoritos = async () => {
    try {
      const user = localStorage.getItem("user");
      const { id } = JSON.parse(user);

      const res = await fetch(`https://proyectofinalg79-1.onrender.com/api/user/fav/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json()
      await setFavorites(data.data)
      const arrayFavoritos = await Promise.all(
        data.data.map((favorito) => fetchProductoById(favorito.id_producto))
      );
      await setFavoritesArray(arrayFavoritos)
    } catch (error) {
      console.error("Error al cargar los favoritos:", error)
    }
  }

  useEffect(() => {
    getAllFavoritos()
  }, [])

  const isFavorite = (idProducto) => {
    return favorites.some((p) => p.id_producto === idProducto);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      favoritesArray,
      getAllFavoritos,
      isFavorite,
      agregarFavorito,
      quitarFavorito
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
