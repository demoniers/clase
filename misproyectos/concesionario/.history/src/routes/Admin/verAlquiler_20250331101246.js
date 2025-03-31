import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from './menu';
import './panel.css'; // Importar los estilos personalizados

function VerAlquiler() {
  const navigate = useNavigate();
  const [rentData, setRentData] = useState([]); // Estado inicial como array
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Verificar token y cargar datos
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
          if (data.tipo_usuario <= 2) {
            alert('No tienes acceso al Panel de Control. Redirigiendo al inicio.');
            navigate('/');
          } else {
            setUserData(data);
            await fetchRentData(); // Llamar a la función para cargar los datos
          }
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

    verifyToken();
  }, [navigate]);

  // Función para cargar datos de alquileres
  const fetchRentData = async () => {
    try {
      const response = await fetch('http://10.0.0.124:5000/api/viewalquileres', {
        method: 'POST',
      });

      const data = await response.json();
      if (data.length === 0) {
        alert('No se encontraron registros de alquileres.');
      } else {
        setRentData(data); // Almacenar los datos en el estado
      }
    } catch (error) {
      console.error('Error al obtener los alquileres:', error);
      setError('Error al cargar los alquileres.');
    }
  };

  // Función para abrir el modal
  const openModal = (id) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  // Mostrar mensaje de carga o error
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
          {userData && (
            <>
              <img
                src={`/img/profile_img/${userData.profile_img}`}
                alt="Foto de perfil"
                className="profile-pic"
              />
              <p className="user-name">
                {userData.nombre} {userData.apellido}
              </p>
            </>
          )}
        </div>
        <Menu />
      </aside>
      <main className="content">
        <div className="panel-header">
          <h1>Panel de Gestión de Usuarios</h1>
        </div>
        <div id="usuariosContainer">
          <table className="user-table-horizontal">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Móvil</th>
                <th>Correo</th>
                <th>Coche</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Precio Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(rentData) && rentData.map((rent, index) => (
                <tr key={rent.id || index} className="cuerpo-tabla">
                  <td>rent.id_coche</td>
                  <td>{rent.nombre || 'N/A'} {rent.apellido || 'N/A'}</td>
                  <td>{rent.dni || 'Sin DNI'}</td>
                  <td>{rent.movil || 'Sin Móvil'}</td>
                  <td>{rent.correo || 'Sin Correo'}</td>
                  <td>{rent.nombre_coche || 'Sin Modelo'}</td>
                  <td>{rent.fecha_inicio || 'Sin Fecha'}</td>
                  <td>{rent.fecha_fin || 'Sin Fecha'}</td>
                  <td>{rent.precio_total ? `${rent.precio_total} €` : 'Sin Precio'}</td>
                  <td>
                    <button onClick={() => openModal(rent.id_alquiler)}>Acción</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </main>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>Detalles del Usuario con ID: {selectedUserId}</p>
            <button onClick={closeModal} className="modal-close-btn">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerAlquiler;
