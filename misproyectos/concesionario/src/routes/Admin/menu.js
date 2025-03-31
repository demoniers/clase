import React from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();

  return (
    <nav className="menu">
      <button onClick={() => navigate('/admin/panel')}>Mis Datos</button>
      <button onClick={() => navigate('/admin/gestionCliente')}>Gestionar Clientes</button>
      <button onClick={() => navigate('/admin/verAlquiler')}>Gestionar Alquileres</button>
      <button onClick={() => navigate('/admin/vhpanel')}>Crear Vehículo</button>
      <button onClick={() => navigate('/concesionario')}>Concesionario</button>
      <button onClick={() => navigate('/')}>Inicio</button>
      <button onClick={() => navigate('/logout')}>Cerrar Sesión</button>
    </nav>
  );
}

export default Menu;
