import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './panel.css'; // Importar los estilos personalizados

function ControlPanel() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [selectedUserId, setSelectedUserId] = useState(null); // ID del usuario seleccionado

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
            showAll();
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
    
    const showAll = async () => {
      try {
        // Hacer la solicitud al backend
        const response = await fetch('http://10.0.0.124:5000/api/users/viewCustomers', {
          method: 'POST',
        });

        // Parsear la respuesta como JSON
        const userData = await response.json();

        if (userData.message) {
          console.log(userData.message); // Mostrar mensaje en consola
        }

        // Obtener la lista de usuarios
        const usuarios = userData.usuarios;
        console.log(usuarios);

        // Renderizar en el HTML
        const usuariosContainer = document.getElementById('usuariosContainer');
        usuariosContainer.innerHTML = `
            <table class="user-table-horizontal">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>DNI</th>
                    <th>Móvil</th>
                    <th>Correo</th>
                    <th>ID Usuario</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="userRows">
                </tbody>
            </table>
        `;

        // Agregar las filas de los usuarios dinámicamente
        const userRows = document.getElementById('userRows');
        usuarios.forEach(usuario => {
          const row = document.createElement('tr');
          row.classList.add('cuerpo-tabla');
          row.innerHTML = `
              <td>${usuario.nombre} ${usuario.apellido}</td>
              <td>${usuario.dni}</td>
              <td>${usuario.movil}</td>
              <td>${usuario.correo}</td>
              <td>${usuario.id}</td>
              <td><button class="action-btn" data-id="${usuario.id}">Acción</button></td>
          `;
          userRows.appendChild(row);
        
          // Agregar el evento click al botón dentro de la fila
          const button = row.querySelector('.action-btn');
          button.addEventListener('click', (event) => {
            const userId = event.target.getAttribute('data-id');
            openModal(userId); // Llamar a la función para abrir el modal
          });
        });
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        const usuariosContainer = document.getElementById('usuariosContainer');
        usuariosContainer.innerHTML = `<p style="color: red;">Error al cargar los usuarios: ${error.message}</p>`;
      }
    };

    const openModal = (id) => {
      setSelectedUserId(id);
      setIsModalOpen(true);
    };

    verifyToken();
  }, [navigate]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const eliminarUser = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://10.0.0.124:5000/api/users/delete', {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier: id
        })
      });
  
      if (response.ok) {
        closeModal();
        alert('Usuario eliminado con éxito.');
      } else {
        const errorData = await response.json(); // Agregar await aquí
        setError(errorData.error);
        alert('No se pudo eliminar el usuario con id: ' + id);
      }
    } catch (err) {
      console.error('Error al eliminar el usuario:', err);
      setError('Error al eliminar el usuario.');
    }
  };
  
  const accessLevel = (id) => {
    // TODO fetch para elimniar usuario apartir de id
  }
  const passwordReset = (id) => {
    // TODO fetch para elimniar usuario apartir de id
  }


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
            src={`/img/profile_img/${userData.profile_img}`}
            alt="Foto de perfil"
            className="profile-pic"
          />
          <p className="user-name">{userData?.nombre} {userData?.apellido}</p>
        </div>
        <nav className="menu">
          <button onClick={() => navigate('/admin/panel')}>Mis Datos</button>
          <button onClick={() => navigate('/admin/vhpanel')}>Crear Vehículo</button>
          <button onClick={() => navigate('/')}>Inicio</button>
          <button onClick={() => navigate('/concesionario')}>Concesionario</button>
          <button onClick={() => navigate('/admin/gestionCliente')}>Gestionar Clientes</button>
          <button onClick={() => navigate('/logout')}>Cerrar Sesión</button>
        </nav>
      </aside>
      <main className="content">
        <div className="panel-header">
          <h1>Panel de Gestion de Usuarios</h1>
        </div>
        <div id="usuariosContainer">
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>Detalles del Usuario con ID: {selectedUserId}</p>
            {/* Botón adicional para cerrar */}
            <button onClick={() => eliminarUser(selectedUserId)} className="modal-close-btn">Eliminar Cuenta</button>
            <button onClick={() => accessLevel(selectedUserId)} className="modal-close-btn">Modificar Acceso</button>
            <button onClick={() => passwordReset(selectedUserId)} className="modal-close-btn">Cambiar Contraseña</button>
            <button onClick={closeModal} className="modal-close-btn">Cerrar</button>

          </div>
        </div>
      )}
    </div>
  );
}

export default ControlPanel;
