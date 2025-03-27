import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from './auth'; // Importar la función de autenticación

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: '',
  });

  useEffect(() => {
    // Verificar si el usuario ya está logueado
    if (isLoggedIn()) {
      navigate('/'); // Redirige al inicio si ya está logueado
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://10.0.0.124:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Inicio de sesión exitoso.');
        const token = data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', true); // Guardar el estado de sesión
        navigate('/'); // Redirige al componente de inicio
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema con el inicio de sesión.');
    }
  };

  return (
    <div className="login-container">
      <h2>Inicio de Sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
          Contraseña:
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
