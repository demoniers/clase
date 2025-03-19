import React, { useState } from 'react';
import './login.css'; // Importa los estilos personalizados para el login
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

function Login() {
  const navigate = useNavigate(); // Hook para navegar
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: '',
  });

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
