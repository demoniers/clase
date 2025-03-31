import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './userpanel.css'; // Importar los estilos personalizados

function ProfilePanel() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    verifyToken();
  }, [navigate]);

  if (loading) {
    return <p className="loading">Cargando...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
  
    if (file) {
      const userId = userData.userId; // ID del usuario
      const timestamp = Date.now(); // Generar un timestamp único
      const extension = file.name.split('.').pop(); // Obtener la extensión del archivo
      const filename = `profile_${userId}_${timestamp}.${extension}`; // Crear el nombre del archivo
  
      console.log('Nuevo nombre del archivo:', filename);
  
      // Crear un objeto FormData para subir la imagen al servidor
      const imgData = new FormData();
      imgData.append('imagen', file, filename); // Adjuntar el archivo con el nuevo nombre
  
      // Enviar la solicitud de la imagen
      try {
        const response = await fetch('http://10.0.0.124:5000/api/uploadProfile', {
          method: 'POST',
          body: imgData,
        });
  
        if (response.ok) {
          const result = response.json(); // Obtener la respuesta en JSON
          console.log('Imagen subida exitosamente:', result.imageName);
        } else {
          console.error('Error al subir la imagen');
          alert('Error al subir la imagen.');
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        alert('Hubo un error al subir la imagen.');
      }
      try {
        // Preparar el contenido del encabezado 'Contenidos'
        const headerContent = JSON.stringify({
          userId: userId, // ID del usuario
          filename: filename, // Nombre del archivo
        });

        // Segunda solicitud para actualizar la base de datos usando el encabezado 'Contenidos'
        const dbResponse = await fetch('http://10.0.0.124:5000/api/user/update_profile_imgDB', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Especificar el tipo de contenido
            'Contenidos': headerContent, // Adjuntar los datos en el encabezado 'Contenidos'
          },
        });

        if (dbResponse.ok) {
          const dbResult = dbResponse.json();
          console.log('Imagen actualizada en la base de datos:', dbResult.message);
        } else {
          console.error('Error al actualizar la imagen en la base de datos');
          alert('Error al actualizar la imagen en la base de datos.');
        }
      
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        alert('Hubo un error al subir la imagen.');
      }
    }
  };
  
  
  
  
  
  
  return (
    <div className="main-container">
      <aside className="sidebar">
        <div className="profile-section">
          <img
            src={`/img/profile_img/${userData.profile_img}`}
            alt="Foto de perfil"
            className="profile-pic"
          />
          <p className="user-name">{userData?.nombre} {userData?.apellido}</p>
        </div>
        <nav className="menu">
          <button onClick={() => navigate('/profile')}>Mis Datos</button>
          <button onClick={() => navigate('/rentals')}>Mis Alquileres</button>
          <button onClick={() => navigate('/rentalPanel')}>Alquilar</button>
          <button onClick={() => navigate('/')}>Inicio</button>
          <button onClick={() => navigate('/logout')}>Cerrar Sesión</button>
        </nav>
      </aside>
      <main className="content">
        <div className="panel-header">
          <h1>Panel de Control</h1>
        </div>
        {userData && (
          <div className="panel-details">
            <div className="profile-info">
              <div className="profile-pic-container">
                <img
                  src={`/img/profile_img/${userData.profile_img}`}
                  alt="Foto de perfil"
                  className="profile-pic-large"
                  onClick={() => document.getElementById('fileInput').click()} // Hacer clic en el input al hacer clic en la imagen
                />
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }} // Ocultar el input de archivo
                  onChange={handleImageChange} // Manejar el cambio de la imagen
                />
              </div>
              <p><strong>Nombre:</strong> {userData.nombre} {userData.apellido}</p>
              <p><strong>Nivel de Acceso:</strong> {userData.tipo_usuario}</p>
            </div>
            <div className="contact-info">
              <p><strong>Correo:</strong> {userData.correo}</p>
              <p><strong>Teléfono:</strong> {userData.movil}</p>
            </div>
            <div className="dni-info">
              <p><strong>DNI:</strong> {userData.dni}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProfilePanel;
