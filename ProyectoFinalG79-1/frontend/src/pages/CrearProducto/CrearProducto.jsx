import { useContext, useEffect, useState } from 'react'
import { ProductosContext } from '../../context/ProductosContext'
import "./CrearProducto.css";

const CrearProducto = () => {
  const { categorias, refreshProductos } = useContext(ProductosContext)
  console.log("categorias en CrearProducto:", categorias)

  const [form, setForm] = useState({
    id_categoria: '',
    nombre: '',
    descripcion: '',
    idioma: 'EN',
    precio_venta: '',
    descuento: 0,
    img: '',
    estado: 'NM',
    rareza: '',
    edicion: '',
    tipo: '',
    color: '',
    foil: false,
  })

  const [mensaje, setMensaje] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones adicionales antes del envío
    const precio = parseFloat(form.precio_venta)
    const descuento = parseFloat(form.descuento)

    if (isNaN(precio) || precio <= 0) {
      setMensaje('❌ El precio debe ser mayor a 0')
      return
    }

    if (descuento < 0 || descuento > 100) {
      setMensaje('❌ El descuento debe estar entre 0 y 100')
      return
    }

    try {
      const dataToSend = {
        ...form,
        id_categoria: parseInt(form.id_categoria),
        precio_venta: precio,
        descuento: descuento || 0,
        estado: form.estado,
      }

      const res = await fetch("https://proyectofinalg79-1.onrender.com/api/producto", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(dataToSend),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al crear producto')

      setMensaje('✅ Producto creado exitosamente')
      setForm({
        id_categoria: '',
        nombre: '',
        descripcion: '',
        idioma: '',
        precio_venta: '',
        descuento: 0,
        img: '',
        estado: '',
        rareza: '',
        edicion: '',
        tipo: '',
        color: '',
        foil: false,
      })
      refreshProductos()
    } catch (err) {
      setMensaje(`❌ ${err.message}`)
    }
  }

  // Mensaje desaparece tras 4 segundos
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [mensaje])

  const esMTG = parseInt(form.id_categoria) === 1

  if (!Array.isArray(categorias) || categorias.length === 0) {
    return <p>Cargando categorías...</p>
  }

  return (
    <div className="container-form">
      <div className="container">
        <h2 className="text-center mb-4">Crear Producto</h2>

        {mensaje && (
          <div className={`alert ${mensaje.includes('✅') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Categoría</label>
            <select
              name="id_categoria"
              value={form.id_categoria}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Selecciona categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.descripcion}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="form-control" />
          </div>

          <div className="row mb-3">
  <div className="col-md-6">
    <label className="form-label">Idioma</label>
    <input
      name="idioma"
      value={form.idioma}
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>

  <div className="col-md-6">
    <label className="form-label">Estado</label>
    <input
      name="estado"
      value={form.estado}
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>
</div>

          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input type="number" name="precio_venta" value={form.precio_venta} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Descuento (%)</label>
            <input type="number" name="descuento" value={form.descuento} onChange={handleChange} className="form-control" min="0" max="100" />
          </div>

          <div className="mb-3">
            <label className="form-label">URL de la imagen</label>
            <input name="img" value={form.img} onChange={handleChange} className="form-control" required />
          </div>

          {esMTG && (
            <div className="mt-4 border-top pt-4">
              <h5 className="mb-3">Detalles Magic: The Gathering</h5>

              <div className="mb-3">
                <label className="form-label">Rareza</label>
                <input name="rareza" value={form.rareza} onChange={handleChange} className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Edición</label>
                <input name="edicion" value={form.edicion} onChange={handleChange} className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <input name="tipo" value={form.tipo} onChange={handleChange} className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Color</label>
                <input name="color" value={form.color} onChange={handleChange} className="form-control" required />
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  name="foil"
                  className="form-check-input"
                  checked={form.foil}
                  onChange={handleChange}
                  id="foilCheck"
                />
                <label className="form-check-label" htmlFor="foilCheck">
                  Foil
                </label>
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-verde w-100 mt-3">
            Crear producto
          </button>
        </form>
      </div>
    </div>
  )
}

export default CrearProducto
