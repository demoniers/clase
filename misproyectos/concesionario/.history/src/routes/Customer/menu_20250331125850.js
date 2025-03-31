import React from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();
    <nav className="menu">
    <button onClick={() => navigate('/profilePanel')}>Mis Datos</button>
    <button onClick={() => navigate('/rentals')}>Mis Alquileres</button>
    <button onClick={() => navigate('/rentalPanel')}>Alquilar</button>
    <button onClick={() => navigate('/')}>Inicio</button>
    <button onClick={() => navigate('/logout')}>Cerrar Sesión</button>
    </nav>
export default Menu;