import  { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { validateCredentials } from '../../Tools/loginRegisterTools';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rut, setRut] = useState('');
  const [telefono, setTelefono] = useState('');

  const { register } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateCredentials(email, password, confirmPassword)) {
      const success = await register(nombre, apellido, email, password, rut, telefono);
      if (success) {
        navigate('/login'); 
      }
    }
  };

  return (
    <div className="d-flex mt-3 align-items-center justify-content-center">
      <div className="card p-3" style={{ width: '20rem' }}>
        <h2 className="text-center mb-4">Registro 🪪:</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Apellido:</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>RUT (sin puntos y con guion):</label>
            <input
              type="text"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Teléfono:</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Confirmar Contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
