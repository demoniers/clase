import React from 'react';
import { useNavigate } from 'react-router-dom';
//import './Menu.css'; // Importar los estilos mejorados

function Menu() {
  const navigate = useNavigate();
  return (
    <nav className="menu-origin">
        <button class="btn-menu" onClick={() => navigate('/')}>Inicio</button>
        <button class="btn-menu" onClick={() => navigate('/profilePanel')}>Mis Datos</button>
        <button class="btn-menu" onClick={() => navigate('/login')}>Iniciar Sesion</button>
        <button class="btn-menu" onClick={() => navigate('/logout')}>Cerrar Sesion</button>
    </nav>
  );
}
export default Menu;
