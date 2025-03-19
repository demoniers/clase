import React, { useState } from 'react';
import './singin.css'; // Importamos los estilos
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SingIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    correo: '',
    movil: '',
    tipo_usuario: '0', // Por defecto: Cliente
    contraseña: '',
  });

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
            <option value="0">Cliente</option>
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
    </div>
  );
}

export default SingIn;
