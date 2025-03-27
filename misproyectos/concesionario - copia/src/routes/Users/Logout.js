import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from './auth'; // Importar la función logout
import './logout.css'; // Usar estilos existentes o agregar nuevos

function LogoutPage() {
  const navigate = useNavigate();

  // Función para manejar la decisión de cerrar sesión
  const handleLogout = () => {
    logout(navigate); // Llamar a la función logout para cerrar sesión y redirigir
  };

  // Función para manejar la decisión de no cerrar sesión
  const handleCancel = () => {
    navigate('/'); // Redirige a la página principal
  };

  return (
    <div className="logout-container">
      <h1>¿Deseas cerrar sesión?</h1>
      <div className="logout-buttons">
        <button onClick={handleLogout} className="logout-confirm-button">
          Sí
        </button>
        <button onClick={handleCancel} className="logout-cancel-button">
          No
        </button>
      </div>
    </div>
  );
}

export default LogoutPage;
