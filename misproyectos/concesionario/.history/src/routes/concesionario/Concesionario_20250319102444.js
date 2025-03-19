import React, { useState, useEffect } from 'react';
import './Concesionario.css'; // Asegúrate de crear y estilizar este archivo CSS

function Concesionario() {
  const [coches, setCoches] = useState([]); // Inicializar con un array vacío
  const [cocheSeleccionado, setCocheSeleccionado] = useState(null);

  // Cargar los datos del backend
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://10.0.0.124:5000/api/coches');
        const data = await response.json();
        setCoches(data);
        setCocheSeleccionado(data[0]); // Seleccionar el primer coche por defecto
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }

    fetchData();
  }, []);

  const seleccionarCoche = (coche) => {
    setCocheSeleccionado(coche);
  };

  return (
    <div className="concesionario">
      {cocheSeleccionado ? (
        <>
          <div className="imagen-grande">
            <img src={`/img/${cocheSeleccionado.img_coche}`} alt={cocheSeleccionado.nombre_coche} />
            <h2>{cocheSeleccionado.nombre_coche}</h2>
          </div>
          <div className="barra-navegacion">
            {coches.map((coche) => (
              <div
                key={coche.id}
                className={`tarjeta ${coche.id === cocheSeleccionado.id ? 'seleccionado' : ''}`}
                onClick={() => seleccionarCoche(coche)}
              >
                <img src={`/img/${coche.img_coche}`} alt={coche.nombre_coche} />
                <p>{coche.nombre_coche}</p>
              </div>
            ))}
          </div>
          {/* Sección de características */}
          <div className="caracteristicas">
            <h3>Características de {cocheSeleccionado.nombre_coche}</h3>
            <div className="barra">
              <label>Velocidad:</label>
              <div className="barra-externa">
                <div
                  className="barra-interna"
                  style={{ width: `${cocheSeleccionado.velocidad || 0}%` }} // Placeholder dinámico
                ></div>
              </div>
            </div>
            <div className="barra">
              <label>Aceleración:</label>
              <div className="barra-externa">
                <div
                  className="barra-interna"
                  style={{ width: `${cocheSeleccionado.aceleracion || 0}%` }} // Placeholder dinámico
                ></div>
              </div>
            </div>
            <div className="barra">
              <label>Frenado:</label>
              <div className="barra-externa">
                <div
                  className="barra-interna"
                  style={{ width: `${cocheSeleccionado.frenado || 0}%` }} // Placeholder dinámico
                ></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Cargando coches...</p>
      )}
    </div>
  );
}

export default Concesionario;
