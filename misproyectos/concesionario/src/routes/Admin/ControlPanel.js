import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './panel.css'; // Importar los estilos personalizados

function ControlPanel() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtener el token desde localStorage

    if (!token) {
      alert('No estás autenticado. Redirigiendo al inicio de sesión.');
      navigate('/login'); // Redirige al login si no hay token
      return;
    }

    // Verificar el token en el backend
    const verifyToken = async () => {
      try {
        const response = await fetch('http://10.0.0.124:5000/api/users/verify', {
          method: 'POST',
          headers: {
            Authorization: token, // Agregar el token en el encabezado
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.tipo_usuario <= 2) {
            alert('No tienes acceso al Panel de Control. Redirigiendo al inicio.');
            navigate('/'); // Redirige al inicio si el nivel de acceso es menor o igual a 2
          } else {
            setUserData(data); // Guardar los datos del usuario
          }
        } else {
          const errorData = await response.json();
          setError(errorData.error);
          alert('Sesión no válida o expirada. Redirigiendo al inicio de sesión.');
          localStorage.removeItem('token'); // Eliminar token
          navigate('/login'); // Redirige al login
        }
      } catch (err) {
        console.error('Error al verificar el token:', err);
        setError('Error al verificar la sesión.');
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    verifyToken();
  }, [navigate]);

  if (loading) {
    return <p className="loading">Cargando...</p>; // Mensaje de carga mientras se verifica el token
  }

  if (error) {
    return <p className="error">Error: {error}</p>; // Mostrar error en caso de fallo
  }

  return (
    <div className="control-panel">
      <h1>Panel de Control</h1>
      {userData && (
        <div className="user-info">
          <p><strong>ID Usuario:</strong> {userData.userId}</p>
          <p><strong>Nivel de Acceso:</strong> {userData.tipo_usuario}</p>
          <p><strong>Correo:</strong> {userData.correo}</p>
          <p><strong>Teléfono:</strong> {userData.movil}</p>
          <p><strong>Nombre:</strong> {userData.nombre} {userData.apellido}</p>
          <p><strong>DNI:</strong> {userData.dni}</p>
        </div>
      )}
    </div>
  );
}

export default ControlPanel;
