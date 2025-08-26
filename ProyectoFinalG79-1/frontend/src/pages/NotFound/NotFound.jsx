import { Link } from 'react-router-dom';
import errorPhoto from '../../assets/images/404.png';

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h1>404 - Página no encontrada</h1>
      <div style={{ maxWidth: '450px', width: '100%' }}>
        <img src={errorPhoto} alt="Foto de error" className="img-fluid" />
      </div>
      <p>La página que buscas no existe.</p>
      <Link to="/" className="btn btn-success">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;
