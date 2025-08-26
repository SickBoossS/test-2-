import { Link } from 'react-router-dom';

const UserOptions = () => {
  return (
   <div className="d-flex mt-3 align-items-center justify-content-center">
      <div className="card p-3" style={{ width: '20rem' }}>
        <h2 className="text-center mb-4">Bienvenido 👋:</h2>
        <div className="d-grid gap-2">
          <Link to="/login" className="btn btn-dark mb-4">
            Iniciar Sesión 🔐:
          </Link>
          <Link to="/register" className="btn btn-dark mb-2">
            Registrarse 🪪:
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserOptions;
