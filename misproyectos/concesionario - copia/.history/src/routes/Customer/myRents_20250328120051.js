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
          setUserData(data);
          fetchRents(data.dni); // Llama a la función para obtener los alquileres
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

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  if (loading) {
    return <p className="loading">Cargando...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <div className="main-container">
      <aside className="sidebar">
        <div className="profile-section">
          <img
            src={`/img/profile_img/${userData?.profile_img || 'default-profile.jpg'}`}
            alt="Foto de perfil"
            className="profile-pic"
          />
          <p className="user-name">{userData?.nombre} {userData?.apellido}</p>
        </div>
        <nav className="menu">
          <button onClick={() => navigate('/profilePanel')}>Mis Datos</button>
          <button onClick={() => navigate('/rentals')}>Mis Alquileres</button>
          <button onClick={() => navigate('/rentalPanel')}>Alquilar</button>
          <button onClick={() => navigate('/')}>Inicio</button>
          <button onClick={() => navigate('/logout')}>Cerrar Sesión</button>
        </nav>
      </aside>
      <main className="content">
        <div className="panel-header">
          <h1>Mis Alquileres</h1>
        </div>
        <div className="panel-details">
          {rents.length === 0 ? (
            <p>No tienes alquileres registrados.</p>
          ) : (
            <div className="profile-info">
              {rents.map((rent) => (
                
                <img
                  src={`/img/${rent.img_coche || 'default-car.jpg'}`}
                  alt={`Imagen de ${rent.nombre_coche}`}
                  className="car-image"
                />
                <div className="rental-card" key={rent.id}>
                  <p><strong>Nombre del Coche:</strong> {rent.nombre_coche}</p>
                  <p><strong>Fecha de Inicio:</strong> {formatDate(rent.fecha_inicio)}</p>
                  <p><strong>Fecha de Fin:</strong> {formatDate(rent.fecha_fin)}</p>
                  <p><strong>Precio Total:</strong> {rent.precio_total}€</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MyRents;
