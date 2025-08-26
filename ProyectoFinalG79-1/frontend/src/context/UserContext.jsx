import { createContext, useState, useEffect } from 'react';
import { showAlert } from '../Tools/loginRegisterTools';
import Swal from 'sweetalert2';

export const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [token, setToken] = useState(() => localStorage.getItem('token'));


  const [userData, setUserData] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ NUEVA FUNCIÓN: actualiza datos del usuario en contexto y localStorage
  const updateUserData = (newData) => {
    setUserData((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('https://proyectofinalg79-1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Credenciales inválidas.');
      }

      setToken(data.token);
      localStorage.setItem('token', data.token);

      const profileRes = await fetch('https://proyectofinalg79-1.onrender.com/api/auth/me', {
        headers: { Authorization: `Bearer ${data.token}` },
      });

      const user = await profileRes.json();
      console.log("🧠 Usuario logueado:", user);
      if (!profileRes.ok) {
        throw new Error(user?.message || 'No se pudo cargar el perfil.');
      }

      setUserData(user);
      localStorage.setItem('user', JSON.stringify(user));
      showAlert('Éxito', 'Inicio de sesión exitoso.', 'success');

      return user;

    } catch (error) {
      showAlert('Error', error.message, 'error');
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  const register = async (nombre, apellido, email, password, rut, telefono) => {
    const capitalize = (str) =>
      str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

    try {
      const formattedNombre = capitalize(nombre);
      const formattedApellido = capitalize(apellido);
      const formattedEmail = email.toLowerCase();

      const response = await fetch('https://proyectofinalg79-1.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formattedNombre,
          apellido: formattedApellido,
          email: formattedEmail,
          password,
          rut,
          telefono,
        }),
      });


      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.message || 'Error al registrar usuario.';
        showAlert('Error', errorMessage, 'error');
        throw new Error(errorMessage);
      }

      console.log('Registro exitoso:', data.message);
      showAlert('Éxito', 'Usuario registrado correctamente ✅', 'success');
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      return false;
    }
  };

  const logout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Tu sesión se cerrará y deberás volver a iniciar sesión para continuar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setToken(null);
        setUserData(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('Sesión cerrada.');
        Swal.fire('Sesión cerrada', 'Has cerrado sesión correctamente.', 'success');
      }
    });
  };

  useEffect(() => {
    if (token && !userData) {
      const fetchUserProfile = async () => {
        try {
          const res = await fetch('https://proyectofinalg79-1.onrender.com/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error('No se pudo obtener perfil');
          const user = await res.json();
          setUserData(user);
          localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
          console.error('Error al obtener perfil:', error.message);
        }
      };
      fetchUserProfile();
    }
  }, [token, userData]);

  // ✅ Incluimos updateUserData en el contexto
  return (
    <UserContext.Provider value={{ token, login, register, logout, userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
