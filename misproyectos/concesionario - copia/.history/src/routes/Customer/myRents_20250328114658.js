import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './userpanel.css'; // Asegúrate de usar tu CSS personalizado

function MyRents() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rents, setRents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No estás autenticado. Redirigiendo al inicio de sesión.');
      navigate('/login');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch('http://10.0.0.124:5000/api/users/verify', {
          method: 'POST',
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser Data(data);
          fetchRents(data.id); // Llama a la función para obtener los alquileres
        } else {
          const errorData = await response.json();
          setError(errorData.error);
          alert('Sesión no válida o expirada. Redirigiendo al inicio de sesión.');
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (err) {
        console.error('Error al verificar el token:', err);
        setError('Error al verificar la sesión.');
      } finally {
        setLoading(false);
      }
    };

    const fetchRents = async (userId) => {
      try {
        const response = await fetch(`http://10.0.0.124:5000/api/alquileres/${userId}`);
        if (response.ok) {
          const rentsData = await response.json();
          setRents(rentsData);
        } else {
          console.error('Error al obtener los alquileres de la API.');
        }
      } catch (err) {
        console.error('Error al obtener los alquileres:', err);
      }
    };

    verifyToken();
  }, [navigate]);

  if (loading) {
    return <p className="loading">Cargando...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <div className="main-container">
      <h1>Mis Alquileres</h1>
      {rents.length === 0 ? (
        <p>No tienes alquileres registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre del Coche</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {rents.map((rent) => (
              <tr key={rent.id}>
                <td>{rent.nombre_coche}</td>
                <td>{new Date(rent.fecha_inicio).toLocaleDateString()}</td>
                <td>{new Date(rent.fecha_fin).toLocaleDateString()}</td>
                <td>{rent.precio_total}€</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyRents;