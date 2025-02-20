import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="home-container">
    <h1>¡Bienvenido a nuestra Aplicación!</h1>
    <p>Conecta con otros estudiantes, únete a grupos y haz nuevas amistades.</p>
    <Link to="/register"><button>Regístrate</button></Link>
    <Link to="/login"><button>Iniciar Sesión</button></Link>
  </div>
);

export default Home;
