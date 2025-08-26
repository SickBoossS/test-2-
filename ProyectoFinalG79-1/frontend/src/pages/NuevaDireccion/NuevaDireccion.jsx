import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import {
  fetchRegiones,
  fetchComunasByRegion,
  createDireccion,
} from "../../Tools/direccionTools";

const NuevaDireccion = () => {
  const { userData, token } = useContext(UserContext);
  const navigate = useNavigate();

const { state } = useLocation();
const fromCheckout = state?.fromCheckout || false;
const cart = state?.cart || null;
const tipoEntrega = state?.tipoEntrega || null;

  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [form, setForm] = useState({
    direccion: "",
    numero: "",
    anexo: "",
    id_region: "",
    id_comuna: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const r = await fetchRegiones(token);
        setRegiones(r);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    })();
  }, [token]);

  useEffect(() => {
    if (!form.id_region) {
      setComunas([]);
      setForm((f) => ({ ...f, id_comuna: "" }));
      return;
    }
    (async () => {
      try {
        const c = await fetchComunasByRegion(form.id_region, token);
        setComunas(c);
        setForm((f) => ({ ...f, id_comuna: "" }));
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    })();
  }, [form.id_region, token]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDireccion(
        {
          id_usuario: userData.id,
          ...form,
          numero: form.numero || null,
          anexo: form.anexo || null,
        },
        token
      );
      Swal.fire("Éxito", "Dirección creada.", "success").then(() => {
  if (fromCheckout && cart && tipoEntrega) {
    navigate("/profile/address", {
      state: { fromCheckout, cart, tipoEntrega },
    });
  } else {
    navigate("/profile/address");
  }
});

    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="container mt-4">
       <div className="card shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h3 className="card-title mb-4">Nueva dirección</h3>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
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
                type="number"
                name="numero"
                value={form.numero}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Anexo</label>
              <input
                type="text"
                name="anexo"
                value={form.anexo}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Región</label>
              <select
                name="id_region"
                value={form.id_region}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Seleccione región</option>
                {regiones.map((r) => (
                  <option key={r.id_region} value={r.id_region}>
                    {r.descripcion}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Comuna</label>
              <select
                name="id_comuna"
                value={form.id_comuna}
                onChange={handleChange}
                required
                disabled={!form.id_region}
                className="form-select"
              >
                <option value="">Seleccione comuna</option>
                {comunas.map((c) => (
                  <option key={c.id_comuna} value={c.id_comuna}>
                    {c.descripcion}
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

export default NuevaDireccion;
