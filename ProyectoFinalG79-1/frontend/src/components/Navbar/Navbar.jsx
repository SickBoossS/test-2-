import { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import './Navbar.css';

import logoDrixel from '../../assets/images/LOGODRIXEL2025.png';
import useroff from '../../assets/images/USERBLACK.png';
import useron from '../../assets/images/USERGREEN.png';

const Navbar = () => {
  const { total } = useContext(CartContext);
  const { token, logout, userData } = useContext(UserContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid navbar-flex-container">
        <div className="navbar-side navbar-left"></div>

        <div className="navbar-center">
          <Link to="/" className="navbar-home-logo" title="Home">
            <img
              src={logoDrixel}
              alt="Drixel Store Logo"
              className="navbar-logo"
            />
          </Link>
        </div>

        <div className="navbar-side navbar-right">
          <button
            className="hamburger-button d-lg-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            ☰
          </button>
          {menuOpen && (
            <div className="mobile-menu d-lg-none" ref={menuRef}>
              {token ? (
                <>
                  <Link to="/favoritos" className="nav-link" onClick={() => setMenuOpen(false)}>
                    ❤️ Mis favoritos
                  </Link>
                  <Link
                    to={userData?.rol?.id_rol === 1 ? '/profileadmin' : '/profile'}
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    🟢 Mi perfil
                  </Link>
                  {userData?.nombre && (
                    <div className="navbar-username px-2">{userData.nombre}</div>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="nav-link btn btn-link"
                  >
                    📴 Cerrar sesión
                  </button>
                </>
              ) : (
                <Link to="/useroptions" className="nav-link" onClick={() => setMenuOpen(false)}>
                  👤 Iniciar sesión
                </Link>
              )}
            </div>
          )}

          <div className="navbar-right-buttons">
            {token ? (
              <>
                <Link
                  to="/favoritos"
                  className="nav-link icon-emoji d-none d-lg-block"
                  title="Mis favoritos"
                >
                  ❤️
                </Link>
                <Link
                  to={userData?.rol?.id_rol === 1 ? '/profileadmin' : '/profile'}
                  className="icon-button d-none d-lg-block"
                  title="Mi perfil"
                >
                  <img src={useron} alt="Usuario activo" className="icon-img" />
                </Link>
                {userData?.nombre && (
                  <span className="navbar-username mx-2 d-none d-lg-block">
                    {userData.nombre}
                  </span>
                )}
                <button
                  onClick={logout}
                  className="icon-button icon-emoji btn btn-link d-none d-lg-block"
                  title="Cerrar sesión"
                >
                  📴
                </button>
              </>
            ) : (
              <Link to="/useroptions" className="icon-button d-none d-lg-block" title="Iniciar sesión">
                <img src={useroff} alt="Usuario apagado" className="icon-img" />
              </Link>
            )}
            <Link to="/cart" className="total-button nav-link" title="Mi carrito">
              <span className="cart-icon" aria-label="Carrito de compras">
                🛒
              </span>
              <span className="cart-amount" aria-live="polite">
                ${total.toLocaleString()}&nbsp;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
