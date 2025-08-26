import { createContext, useState, useEffect } from "react"
import { useContext } from "react"
import { UserContext } from "./UserContext"

export const ProductosContext = createContext()

const ProductosProvider = ({ children }) => {
  const [allproductos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const { token } = useContext(UserContext)

  const fetchProductos = async () => {
    try {
      const res = await fetch("https://proyectofinalg79-1.onrender.com/api/productos")
      const data = await res.json()
      console.log("Productos recibidos:", data)
      setProductos(data)
    } catch (error) {
      console.error("Error al cargar productos:", error)
    }
  }

  const fetchProductoById = async (id) => {
    try {
      const res = await fetch(`https://proyectofinalg79-1.onrender.com/api/producto/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      return data[0]
    } catch (error) {
      console.error("Error al cargar productos:", error)
    }
  }

  const fetchCategorias = async () => {
    try {
      const res = await fetch("https://proyectofinalg79-1.onrender.com/api/categorias", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      setCategorias(data.data)
    } catch (error) {
      console.error("Error al cargar categorías:", error)
    }
  }

  useEffect(() => {
    fetchProductos()
    if (token) fetchCategorias()
  }, [token])

  return (
    <ProductosContext.Provider
      value={{
        allproductos,
        fetchProductoById,
        categorias,
        refreshProductos: fetchProductos, // ✅ ya está definida fuera del useEffect
      }}
    >
      {children}
    </ProductosContext.Provider>
  )
}
export default ProductosProvider;
