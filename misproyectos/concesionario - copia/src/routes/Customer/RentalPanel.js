import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './userpanel.css'; // Asegúrate de usar tu CSS personalizado

function RentalPanel() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]); // Estado para los coches

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

    const fetchCars = async () => {
      try {
        const response = await fetch('http://10.0.0.124:5000/api/coches'); // Petición a la API de coches
        if (response.ok) {
          const carsData = await response.json();
          setCars(carsData); // Guardar los coches en el estado
        } else {
          console.error('Error al obtener coches de la API.');
        }
      } catch (err) {
        console.error('Error al obtener los coches:', err);
      }
    };

    verifyToken();
    fetchCars();
  }, [navigate]);

  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setIsModalOpen(false);
  };

  const fetchCars = async () => {
    try {
      const response = await fetch('http://10.0.0.124:5000/api/coches'); // Petición a la API de coches
      if (response.ok) {
        const carsData = await response.json();
        setCars(carsData); // Guardar los coches en el estado
      } else {
        console.error('Error al obtener coches de la API.');
      }
    } catch (err) {
      console.error('Error al obtener los coches:', err);
    }
  };

  const rentCar = async (carId, Userid, precio_por_dia) => {
    const token = localStorage.getItem('token');
    const fechaInicio = new Date().toISOString().split('T')[0]; // Fecha actual
    const fechaFin = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]; // Fecha de fin (1 día después)
    const precioTotal = precio_por_dia; // Precio total por un día
  
    try {
      const response = await fetch('http://10.0.0.124:5000/api/alquilar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          id_usuario: Userid,
          id_coche: carId,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          precio_total: precioTotal,
        }),
      });
  
      if (response.ok) {
        alert("Se ha alquilado!!");
        fetchCars();
        closeModal();
      } else {
        const errorData = await response.json();
        console.error('Error al alquilar el coche:', errorData.error);
        alert('Error al alquilar el coche. Inténtalo de nuevo.');
      }
    } catch (err) {
      console.error('Error al alquilar el coche:', err);
    }
  };

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
          <button onClick={() => navigate('/myrents')}>Mis Alquileres</button>
          <button onClick={() => navigate('/rentalPanel')}>Alquilar</button>
          <button onClick={() => navigate('/')}>Inicio</button>
          <button onClick={() => navigate('/logout')}>Cerrar Sesión</button>
        </nav>
      </aside>
      <main className="content">
        <div className="panel-header">
          <h1>Alquiler de Coches</h1>
        </div>
        <div className="panel-details">
          {cars.length === 0 ? (
            <p>No hay coches disponibles.</p>
          ) : (
            cars.map((car) => {
              const hay = car.disponible === 1 ? "Disponible" : "No Disponible"; // Determinar si el coche está disponible
              return (
                <div className="profile-info" key={car.id}>
                  <img src={`/img/${car.img_coche}`} alt={car.nombre_coche} />
                  <p><strong>{car.nombre_coche}</strong></p>
                  <p>Precio por día: <strong>{car.precio_por_dia}€</strong></p>
                  <p>Estado: <strong>{hay}</strong></p>
                  <button
                    className="action-btn"
                    onClick={() => openModal(car)}
                    disabled={car.disponible !== 1} // Botón desactivado si no está disponible
                  >
                    Alquilar
                  </button>
                </div>
              );
            })
          )}
        </div>
      </main>
      {/* Modal */}
      {isModalOpen && selectedCar && userData && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Detalles de Reserva</h2>
            <img src={`/img/${selectedCar.img_coche}`} alt={`Imagen de ${selectedCar.nombre_coche}`} />
            <p><strong>{selectedCar.nombre_coche}</strong></p>
            <p>Precio por día: <strong>{selectedCar.precio_por_dia}€</strong></p>
            <button onClick={() => rentCar(selectedCar.id, userData.dni, selectedCar.precio_por_dia)} className="modal-close-btn">Confirmar Reserva</button>
            <button onClick={closeModal} className="modal-close-btn">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default RentalPanel;
