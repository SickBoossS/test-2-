import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import {
  fetchRegiones,
  fetchComunasByRegion,
  updateDireccion,
} from "../../Tools/direccionTools";

const EditDireccion = () => {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    direccion: "",
    numero: "",
    anexo: "",
    id_region: "",
    id_comuna: "",
  });

  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carga la dirección y regiones al inicio
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resDir = await fetch(`https://proyectofinalg79-1.onrender.com/api/direccion/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resDir.ok) throw new Error("No se pudo cargar la dirección");
        const { data } = await resDir.json();
        const direccion = data[0];
        setForm({
          direccion: direccion.direccion || "",
          numero: direccion.numero || "",
          anexo: direccion.anexo || "",
          id_region: direccion.id_region || "",
          id_comuna: direccion.id_comuna || "",
        });

        const regionesData = await fetchRegiones(token);
        setRegiones(regionesData);

        // Cargar comunas de la región que tiene la dirección
        if (direccion.id_region) {
          const comunasData = await fetchComunasByRegion(direccion.id_region, token);
          setComunas(comunasData);
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [id, token]);

  // Cuando cambia la región, cargar las comunas de esa región
  useEffect(() => {
    if (!form.id_region) {
      setComunas([]);
      setForm((f) => ({ ...f, id_comuna: "" }));
      return;
    }
    const cargarComunas = async () => {
      try {
        const comunasData = await fetchComunasByRegion(form.id_region, token);
        setComunas(comunasData);
        // Si la comuna actual no pertenece a la nueva región, la limpiamos
        if (!comunasData.find((c) => c.id_comuna === form.id_comuna)) {
          setForm((f) => ({ ...f, id_comuna: "" }));
        }
      } catch (err) {
        Swal.fire("Error", "No se pudieron cargar las comunas", "error");
      }
    };
    cargarComunas();
  }, [form.id_region, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.id_region || !form.id_comuna) {
      Swal.fire("Atención", "Debes seleccionar región y comuna", "warning");
      return;
    }
    try {
      await updateDireccion(id, form, token);
      Swal.fire("Éxito", "Dirección actualizada.", "success").then(() =>
        navigate("/profile/address")
      );
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando…</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h3 className="card-title mb-4 text-center">Editar dirección</h3>

          <form onSubmit={handleSubmit}>
            {/* Otros campos */}
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Número</label>
              <input
                name="numero"
                value={form.numero}
                onChange={handleChange}
                type="number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">N° de Casa o Departamento</label>
              <input
                name="anexo"
                value={form.anexo || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* Select Región */}
            <div className="mb-3">
              <label className="form-label">Región</label>
              <select
                name="id_region"
                value={form.id_region}
                onChange={handleChange}
                required
                className="form-select"
              >
                {regiones.map((region) => (
                  <option key={region.id_region} value={region.id_region}>
                    {region.descripcion} 
                  </option>
                ))}

              </select>
            </div>

            {/* Select Comuna */}
            <div className="mb-3">
              <label className="form-label">Comuna</label>
              <select
                name="id_comuna"
                value={form.id_comuna}
                onChange={handleChange}
                required
                className="form-select"
                disabled={!form.id_region}
              >
                {comunas.map((comuna) => (
                  <option key={comuna.id_comuna} value={comuna.id_comuna}>
                    {comuna.descripcion} 
                  </option>
                ))}

              </select>
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDireccion;
