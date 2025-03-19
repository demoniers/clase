import React, { useState, useEffect } from 'react';
import './Home.css'; // Asegúrate de tener un archivo CSS para estilos

// Lista de imágenes (puedes conectar esto a una API para datos dinámicos)
const images = [
  '/img/lambohuracan.jpg',
  '/img/ferrari488gtb.jpg',
  '/img/porsche911.jpg',
  '/img/audir8.jpg',
  '/img/teslamodels.jpg',
];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambia de imagen cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
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
      </div>
    </div>
  );
}

export default Home;
