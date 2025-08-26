import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { validateCredentials } from '../../Tools/loginRegisterTools';
import { UserContext } from '../../context/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateCredentials(email, password)) {
      const user = await login(email, password); // Uso el return user del context.
      if (user) {
        const isAdmin = user.rol?.id_rol === 1;
        navigate(isAdmin ? '/profileadmin' : '/profile');
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="card p-3" style={{ width: '20rem' }}>
        <h2 className="text-center mb-4">Iniciar Sesión 🔐:</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-dark w-100">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
