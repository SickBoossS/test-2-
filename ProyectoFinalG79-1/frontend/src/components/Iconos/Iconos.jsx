import { useNavigate, useLocation } from 'react-router-dom';
import './Iconos.css';
import singleMtgImg from '../../assets/images/SINGLESBLACK.png';
import accesoriosImg from '../../assets/images/ACCTCGBLACK.png';
import selladosImg from '../../assets/images/SELLADOSTCGBLACK.png';
import figurasImg from '../../assets/images/FIGBLACK.png';
import peluchesImg from '../../assets/images/PELUBLACK.png';
import videojuegosImg from '../../assets/images/GAMESBLACK.png';

const categorias = [
  { label: 'Single MTG', path: '/productos/single_mtg', img: singleMtgImg },
  { label: 'Accesorios TCG', path: '/productos/accesorios_tcg', img: accesoriosImg },
  { label: 'Sellados TCG', path: '/productos/sellados_tcg', img: selladosImg },
  { label: 'Figuras', path: '/productos/figuras', img: figurasImg },
  { label: 'Peluches y Otros', path: '/productos/peluches_otros', img: peluchesImg },
  { label: 'Videojuegos y Accesorios', path: '/productos/videojuegos_acc', img: videojuegosImg },
];

const Iconos = () => {
  const navigate = useNavigate();
  const location = useLocation();

return (
    <div className="iconos-container">
      {categorias.map(({ label, path, img }, index) => {
        const isActive = location.pathname === path;  
        return (
          <div
            key={index}
            className={`icono ${isActive ? 'activo' : ''}`}
            onClick={() => navigate(path)}
          >
            <img src={img} alt={label} />
          </div>
        );
      })}
    </div>
  );
};

export default Iconos;
