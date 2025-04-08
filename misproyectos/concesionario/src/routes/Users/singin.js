import React, { useState, useEffect, useRef } from 'react';
import './singin.css'; // Importamos los estilos
import { useNavigate } from 'react-router-dom';

function SingIn() {
  const navigate = useNavigate();
  const currentImageIndexRef = useRef(0); // Índice del carrusel
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    correo: '',
    movil: '',
    tipo_usuario: '0', // Por defecto: Cliente
    contraseña: '',
  });

  // Imágenes para el carrusel
  const images = [
    '/img/lambohuracan.jpg',
    '/img/ferrari488gtb.jpg',
    '/img/porsche911.jpg',
    '/img/audir8.jpg',
    '/img/teslamodels.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      currentImageIndexRef.current = (currentImageIndexRef.current + 1) % images.length; // Incrementar índice circular
      const activeImage = document.querySelectorAll('.carousel-image');
      activeImage.forEach((image, index) => {
        image.classList.toggle('active', index === currentImageIndexRef.current);
      });
    }, 5000); // Cambiar de imagen cada 5 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [images.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://10.0.0.124:5000/api/users/singin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Usuario registrado exitosamente.');
        navigate('/login');
      } else {
        alert('Error al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema con el registro.');
    }
  };

  return (
    <div className="singin-container">
      <h2>Registro de Usuario</h2>
      <form className="singin-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          DNI:
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Correo:
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Móvil:
          <input
            type="text"
            name="movil"
            value={formData.movil}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Tipo de Usuario:
          <select
            name="tipo_usuario"
            value={formData.tipo_usuario}
            onChange={handleChange}
            required
          >
            <option  value="0">Cliente</option>
            <option value="1">Trabajador</option>
            <option value="2">Admin</option>
            <option value="9">Jefe</option>
          </select>
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Registrar Usuario</button>
      </form>
      {/* Carrusel de imágenes */}
      <div className="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-image ${index === 0 ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default SingIn;
