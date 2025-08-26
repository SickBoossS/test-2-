const API = "https://proyectofinalg79-1.onrender.com/api";

export const fetchRegiones = async (token) => {
  const res = await fetch(`${API}/region`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("No se pudieron obtener las regiones");
  return (await res.json()).data;
};

export const fetchComunasByRegion = async (idRegion, token) => {
  const res = await fetch(`${API}/comuna/region/${idRegion}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("No se pudieron obtener las comunas por región");
  return (await res.json()).data;
};

export const fetchComunas = async (token) => {
  const res = await fetch(`${API}/comuna`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("No se pudieron obtener las comunas");
  return (await res.json()).data;
};

export const createDireccion = async (body, token) => {
  const res = await fetch(`${API}/direccion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("No se pudo crear la dirección");
  return (await res.json()).data;
};

export const fetchDireccionesByUser = async (idUsuario, token) => {
  const res = await fetch(`${API}/direcciones/${idUsuario}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("No se pudieron obtener las direcciones");
  const { data } = await res.json();
  return data;
};

export const deleteDireccion = async (idDireccion, token) => {
  const res = await fetch(`${API}/direccion/${idDireccion}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("No se pudo eliminar la dirección");
};

export const updateDireccion = async (idDireccion, body, token) => {
  const res = await fetch(`${API}/direccion/${idDireccion}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("No se pudo actualizar la dirección");
  const { data } = await res.json();
  return data;
};

