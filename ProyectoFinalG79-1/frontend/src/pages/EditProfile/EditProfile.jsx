import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const EditProfile = () => {
    const { userData, token, updateUserData } = useContext(UserContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: userData.nombre || "",
        apellido: userData.apellido || "",
        telefono: userData.telefono || "",
        rut: userData.rut || "",
        img: userData.img || "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Fetch URL:', `https://proyectofinalg79-1.onrender.com/api/user/${userData.id}`);
        console.log('userData completo:', userData);
console.log('Datos enviados:', formData);

        try {
            const res = await fetch(`https://proyectofinalg79-1.onrender.com/api/user/${userData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (res.ok) {
                updateUserData(result.user); // actualiza el contexto con los nuevos datos
                navigate("/profile");
            } else {
                alert(result.error || "Error al actualizar el perfil");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Editar Perfil</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>RUT</Form.Label>
                    <Form.Control
                        type="text"
                        name="rut"
                        value={formData.rut}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>URL de imagen</Form.Label>
                    <Form.Control
                        type="text"
                        name="img"
                        value={formData.img}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button type="submit" className="btn btn-success">Guardar cambios</Button>
            </Form>
        </div>
    );
};

export default EditProfile;
