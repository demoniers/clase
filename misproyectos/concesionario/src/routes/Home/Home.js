import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar React Router para la navegación
import Menu from './menu';
import './Home.css';
const images = [
  '/img/lambohuracan.jpg',
  '/img/ferrari488gtb.jpg',
  '/img/porsche911.jpg',
  '/img/audir8.jpg',
  '/img/teslamodels.jpg',
];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate(); // Hook de React Router para navegar

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigateToCatalog = () => {
    navigate('/concesionario'); // Navega a la ruta del catálogo
  };

  return (
    <div className="home">
    <Menu />
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
      <div className="overlay">
        <h1>Bienvenido al Concesionario</h1>
        <p>Encuentra el coche de tus sueños con nosotros.</p>
        <button className="ver-catalogo-button" onClick={handleNavigateToCatalog}>
          Ver Catálogo
        </button>
      </div>
    </div>
  );
}

export default Home;
