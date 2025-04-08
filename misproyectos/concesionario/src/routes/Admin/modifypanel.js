import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from './menu';
import './MODIFYpanel.css';

function EditarCoches() {
  const navigate = useNavigate();
  const [coches, setCoches] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

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
            await fetchCochesData();
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

  const fetchCochesData = async () => {
    try {
      const response = await fetch('http://10.0.0.124:5000/api/coches');
      const data = await response.json();
      setCoches(data);
    } catch (error) {
      console.error('Error al obtener los coches:', error);
      setError('Error al cargar los coches.');
    }
  };

  const openModal = (car) => {
    setSelectedCar(car);
  };

  const closeModal = () => {
    setSelectedCar(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedCar({
      ...selectedCar,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      // Construir la URL con los datos como parámetros
      const queryParams = new URLSearchParams({
        nombre_coche: selectedCar.nombre_coche,
        velocidad_punta: selectedCar.velocidad_punta,
        aceleracion: selectedCar.aceleracion,
        consumo: selectedCar.consumo,
        newtons_par: selectedCar.newtons_par,
        caballos: selectedCar.caballos,
        numero_marchas: selectedCar.numero_marchas,
        automatico: selectedCar.automatico,
        tiene_levas: selectedCar.tiene_levas,
        precio_por_dia: selectedCar.precio_por_dia, // Añadido el precio
      }).toString();
  
      const response = await fetch(`http://10.0.0.124:5000/api/modifycoches/${selectedCar.id}?${queryParams}`, {
        method: 'GET', // Método GET
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        alert('Coche actualizado exitosamente.');
        closeModal();
        await fetchCochesData(); // Refrescar la lista de coches
      } else {
        alert('Error al actualizar el coche.');
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Error al guardar los cambios.');
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
          <h1>Alquiler de Coches</h1>
        </div>
        <div className="panel-details">
          {coches.length === 0 ? (
            <p>No hay coches disponibles.</p>
          ) : (
            coches.map((car) => {
              const disponibilidad = car.disponible === 1 ? "Disponible" : "No Disponible";
              return (
                <div className="car-card" key={car.id}>
                  <img src={`/img/${car.img_coche}`} alt={car.nombre_coche} className="car-image" />
                  <p><strong>{car.nombre_coche}</strong></p>
                  <p>Precio por día: <strong>{car.precio_por_dia}€</strong></p>
                  <p>Estado: <strong>{disponibilidad}</strong></p>
                  <button
                    className="action-btn"
                    onClick={() => openModal(car)}
                  >
                    Editar
                  </button>
                </div>
              );
            })
          )}
        </div>
      </main>
      {selectedCar && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Editando: {selectedCar.nombre_coche}</h2>
            <table className="edit-table">
              <tbody>
                <tr>
                  <td>Nombre del coche</td>
                  <td>
                    <input
                      type="text"
                      name="nombre_coche"
                      value={selectedCar.nombre_coche}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Precio por día</td>
                  <td>
                    <input
                      type="number"
                      name="precio_por_dia"
                      value={selectedCar.precio_por_dia}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Velocidad punta</td>
                  <td>
                    <input
                      type="number"
                      name="velocidad_punta"
                      value={selectedCar.velocidad_punta}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Aceleración</td>
                  <td>
                    <input
                      type="number"
                      name="aceleracion"
                      value={selectedCar.aceleracion}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Consumo</td>
                  <td>
                    <input
                      type="number"
                      name="consumo"
                      value={selectedCar.consumo}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Par máximo</td>
                  <td>
                    <input
                      type="number"
                      name="newtons_par"
                      value={selectedCar.newtons_par}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Caballos</td>
                  <td>
                    <input
                      type="number"
                      name="caballos"
                      value={selectedCar.caballos}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Número de marchas</td>
                  <td>
                    <input
                      type="number"
                      name="numero_marchas"
                      value={selectedCar.numero_marchas}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Automático</td>
                  <td>
                    <input
                      type="checkbox"
                      name="automatico"
                      checked={selectedCar.automatico}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Tiene levas</td>
                  <td>
                    <input
                      type="checkbox"
                      name="tiene_levas"
                      checked={selectedCar.tiene_levas}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="modal-save-btn" onClick={handleSaveChanges}>
              Guardar Cambios
            </button>
            <button className="modal-close-btn" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );  
}

export default EditarCoches;
