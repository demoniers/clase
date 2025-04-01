import React, { useState, useEffect } from 'react'; // Asegúrate de importar useState y useEffect
import { useNavigate } from 'react-router-dom';
import { logout } from './auth';
import './logout.css';

const images = [
  '/img/lambohuracan.jpg',
  '/img/ferrari488gtb.jpg',
  '/img/porsche911.jpg',
  '/img/audir8.jpg',
  '/img/teslamodels.jpg',
];

function LogoutPage() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para el índice actual

  // Lógica del carrusel para cambiar imágenes automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  const handleLogout = () => {
    logout(navigate);
  };

  const handleCancel = () => {
    navigate('/');
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
      
        
      <div className="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-image ${
              index === currentImageIndex ? 'active' : ''
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default LogoutPage;
