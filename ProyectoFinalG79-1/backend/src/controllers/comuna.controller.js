import {
  createComunaModel,
  deleteComunanModel,
  readAllComunaModel,
  readComunaByRegionModel,
  updateComunanModel,
} from "../models/comuna.model.js";

/* crear */
export const createComuna = async (req, res) => {
  try {
    const { descripcion, id_region } = req.body;
    const data = await createComunaModel(descripcion, id_region);
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ error: "Error al crear comuna" });
  }
};

/* listar todas */
export const readAllComuna = async (_, res) => {
  try {
    const data = await readAllComunaModel();
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ error: "Error al listar comunas" });
  }
};

/* listar por región */
export const readComunaByRegion = async (req, res) => {
  try {
    const { id_region } = req.params;
    const data = await readComunaByRegionModel(id_region);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ error: "Error al listar comunas" });
  }
};

/* actualizar */
export const updateComuna = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, id_region } = req.body;
    const data = await updateComunanModel(id, descripcion, id_region);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ error: "Error al actualizar comuna" });
  }
};

/* eliminar */
export const deleteComuna = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteComunanModel(id);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ error: "Error al eliminar comuna" });
  }
};
