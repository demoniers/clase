import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './vehiclepanel.css'; // Importar los estilos personalizados

function VehiclePanel() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // carga formulario 
  
  const [formData, setFormData] = useState({
    nombre: '',
    velocidad_punta: '',
    aceleracion: '',
    consumo: '',
    newtons_par: '',
    caballos: '',
    numero_marchas: '',
    automatico: false,
    tiene_levas: false,
  });
  const [imagen, setImagen] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]); // Guarda la imagen seleccionada
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('velocidad_punta', formData.velocidad_punta);
    formDataToSend.append('aceleracion', formData.aceleracion);
    formDataToSend.append('consumo', formData.consumo);
    formDataToSend.append('newtons_par', formData.newtons_par);
    formDataToSend.append('caballos', formData.caballos);
    formDataToSend.append('numero_marchas', formData.numero_marchas);
    formDataToSend.append('automatico', formData.automatico);
    formDataToSend.append('tiene_levas', formData.tiene_levas);
    formDataToSend.append('imagen', imagen);

    try {
      const response = await fetch('http://10.0.0.124:5000/api/coches/add', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Vehículo añadido correctamente');
        setFormData({
          nombre: '',
          velocidad_punta: '',
          aceleracion: '',
          consumo: '',
          newtons_par: '',
          caballos: '',
          numero_marchas: '',
          automatico: false,
          tiene_levas: false,
        });
        setImagen(null);
      } else {
        alert('Error al añadir el vehículo');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al subir el vehículo.');
    }
  };


  // COMPROBACION DE PERSMISOS

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
    <div className="add-car-panel">
      <h1>Añadir Vehículo</h1>
      <form onSubmit={handleSubmit} className="add-car-form">
        <div className="form-column">
          <label>
            Foto del vehículo:
            <input type="file" accept="image/*" onChange={handleImageChange} required />
          </label>
          <label>
            Nombre del vehículo:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-column">
          <label>
            Velocidad Punta (km/h):
            <input
              type="number"
              name="velocidad_punta"
              value={formData.velocidad_punta}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Aceleración (0-100 km/h en s):
            <input
              type="number"
              step="0.1"
              name="aceleracion"
              value={formData.aceleracion}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Consumo (l/100 km):
            <input
              type="number"
              step="0.1"
              name="consumo"
              value={formData.consumo}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-column">
          <label>
            Par Máximo (Nm):
            <input
              type="number"
              name="newtons_par"
              value={formData.newtons_par}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Caballos (CV):
            <input
              type="number"
              name="caballos"
              value={formData.caballos}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Número de Marchas:
            <input
              type="number"
              name="numero_marchas"
              value={formData.numero_marchas}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-column">
          <label>
            Automático:
            <input
              type="checkbox"
              name="automatico"
              checked={formData.automatico}
              onChange={handleChange}
            />
          </label>
          <label>
            Tiene Levas:
            <input
              type="checkbox"
              name="tiene_levas"
              checked={formData.tiene_levas}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit" className="submit-button">
          Subir Vehículo
        </button>
      </form>
    </div>
  );
}

export default VehiclePanel;
