import bcrypt from 'bcryptjs';
import { createUserModel, findUserByIdModel, updateUserModel } from "../models/user.model.js"

export const createUser = async (req, res) => {
    try {
        const { nombre, apellido, email, password, rut, telefono } = req.body;

        if (!nombre || !apellido || !email || !password) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const result = await createUserModel(nombre, apellido, email, password, rut, telefono);
        res.status(200).json({ user: result });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' });
        console.error('ERROR_CONTROLLER_CREATE =>', error);
    }
};


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: 'ID is Required' })
        }
        const data = await findUserByIdModel(id)
        res
            .status(!data ? 400 : 200)
            .json(!data ? { error: 'Data not found' } : { data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.log('ERROR_CONTROLLER_READ =>', error.message)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        let { nombre, apellido, password, rut, telefono, img } = req.body;

        // Validar que el ID esté presente
        if (!id) {
            return res.status(400).json({ error: 'ID es requerido' });
        }

        // Obtener usuario actual para conservar datos que no se envíen y para password si no se cambia
        const existingUser = await findUserByIdModel(id);
        if (!existingUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Conservar valores actuales si no se envían en el body...
        nombre = nombre ?? existingUser.nombre;
        apellido = apellido ?? existingUser.apellido;
        rut = rut === "" ? null : rut ?? existingUser.rut;
        telefono = telefono ?? existingUser.telefono;
        img = img === "" ? null : img ?? existingUser.img;

        // Password si no envían conservaractual, si sí, hashea El pasS
        if (!password) {
            password = existingUser.password;
        } else {
            const salt = bcrypt.genSaltSync(10);
            password = bcrypt.hashSync(password, salt);
        }
        console.log({ id, nombre, apellido, password, rut, telefono, img });
        const result = await updateUserModel(id, nombre, apellido, password, rut, telefono, img);
        res.status(200).json({ user: result });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' });
        console.error('ERROR_CONTROLLER_UPDATE =>', error);
    }
};

