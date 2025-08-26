import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import {
  fetchDireccionesByUser,
  deleteDireccion,
  fetchRegiones,
  fetchComunasByRegion,
} from "../../Tools/direccionTools";
import "./MisDirecciones.css";

const MisDirecciones = () => {
  const { userData, token } = useContext(UserContext);
  const [direcciones, setDirecciones] = useState(null);
  const [regionesMap, setRegionesMap] = useState({});
  const [comunasMap, setComunasMap] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();

  // Variables para el flujo de checkout
  const fromCheckout = state?.fromCheckout || false;
  const cart = state?.cart || null;
  const tipoEntrega = state?.tipoEntrega || null;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [direccionesData, regionesData] = await Promise.all([
          fetchDireccionesByUser(userData.id, token),
          fetchRegiones(token),
        ]);

        const regiones = {};
        for (const r of regionesData) {
          regiones[r.id_region] = r.descripcion;
        }

        const comunas = {};
        const regionIds = [...new Set(direccionesData.map((d) => d.id_region))];
        for (const idRegion of regionIds) {
          const comunasData = await fetchComunasByRegion(idRegion, token);
          for (const c of comunasData) {
            comunas[c.id_comuna] = c.descripcion;
          }
        }

        setDirecciones(direccionesData);
        setRegionesMap(regiones);
        setComunasMap(comunas);
      } catch (err) {
        console.error(err.message);
        Swal.fire("Error", err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    if (userData) cargarDatos();
  }, [userData, token]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Borrar dirección?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDireccion(id, token);
          setDirecciones((prev) =>
            prev.filter((dir) => dir.id_direccion !== id)
          );
          Swal.fire("Borrada", "La dirección se borró correctamente.", "success");
        } catch (err) {
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };

  const handleSelectDireccion = (direccion) => {
    if (fromCheckout && cart && tipoEntrega) {
      // Volver a checkout con dirección seleccionada
      navigate("/checkout", {
        state: { cart, tipoEntrega, direccionEnvio: direccion },
      });
    }
  };

  if (loading) return <p>Cargando direcciones…</p>;

  return (
    <div className="main-container">
      <h2>Mis direcciones</h2>
      <div className="group-container">
        {direcciones?.length ? (
          direcciones.map((dir) => (
            <div
              key={dir.id_direccion}
              className="card-container"
              style={{ cursor: fromCheckout ? "pointer" : "default" }}
              onClick={() => {
                if (fromCheckout) handleSelectDireccion(dir);
              }}
            >
              <div>
                <strong>{dir.direccion}</strong> Nº {dir.numero}
                {dir.anexo && `, ${dir.anexo}`} <br />
                Región: {regionesMap[dir.id_region] || "Desconocida"} – Comuna:{" "}
                {comunasMap[dir.id_comuna] || "Desconocida"}
              </div>

              {!fromCheckout && (
                <div className="acciones">
                  <button
                    className="btn-a mt-4"
                    onClick={() =>
                      navigate(`/profile/address/${dir.id_direccion}/edit`)
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="btn-r mt-4"
                    onClick={() => handleDelete(dir.id_direccion)}
                  >
                    Borrar
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No tienes direcciones registradas.</p>
        )}
      </div>
      <button
        className="btn-v mt-3"
        onClick={() =>
          navigate("/profile/address/new", {
            state: fromCheckout ? { fromCheckout: true, cart, tipoEntrega } : {},
          })
        }
      >
        + Nueva dirección
      </button>
    </div>
  );
};

export default MisDirecciones;
