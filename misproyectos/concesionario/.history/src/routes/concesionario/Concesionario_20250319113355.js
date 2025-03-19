import React, { useState, useEffect, useRef  } from 'react';
import './Concesionario.css'; // Archivo CSS actualizado

function Concesionario() {
  const [coches, setCoches] = useState([]);
  const [cocheSeleccionado, setCocheSeleccionado] = useState(null);
  const barraRef = useRef(null); // Referencia para la barra de navegación

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://10.0.0.124:5000/api/coches');
        const data = await response.json();
        setCoches(data);
        setCocheSeleccionado(data[0]);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }
    fetchData();
  }, []);

  const seleccionarCoche = (coche) => {
    setCocheSeleccionado(coche);
  };

  // Funciones para el desplazamiento arrastrable
  const onMouseDown = (e) => {
    barraRef.current.isDown = true;
    barraRef.current.startX = e.pageX - barraRef.current.offsetLeft;
    barraRef.current.scrollLeft = barraRef.current.scrollLeft || 0;
  };

  const onMouseMove = (e) => {
    if (!barraRef.current.isDown) return;
    const x = e.pageX - barraRef.current.offsetLeft;
    const walk = (x - barraRef.current.startX) * 2; // Ajusta la velocidad
    barraRef.current.scrollLeft = barraRef.current.scrollLeft - walk;
  };

  const onMouseUpOrLeave = () => {
    barraRef.current.isDown = false;
  };

  return (
    <div className="concesionario">
      {cocheSeleccionado ? (
        <div className="contenido">
          <div className="imagen-grande">
            <img src={`/img/${cocheSeleccionado.img_coche}`} alt={cocheSeleccionado.nombre_coche} />
            <h2>{cocheSeleccionado.nombre_coche}</h2>
          </div>
          <div className="caracteristicas">
            <h3>Características de {cocheSeleccionado.nombre_coche}</h3>
            <div className="barra">
              <label>Velocidad:</label>
              <div className="barra-externa">
                <div
                  className="barra-interna"
                  style={{ width: `${cocheSeleccionado.velocidad || 0}%` }}
                ></div>
              </div>
            </div>
            <div className="barra">
              <label>Aceleración:</label>
              <div className="barra-externa">
                <div
                  className="barra-interna"
                  style={{ width: `${cocheSeleccionado.aceleracion || 0}%` }}
                ></div>
              </div>
            </div>
            <div className="barra">
              <label>Frenado:</label>
              <div className="barra-externa">
                <div
                  className="barra-interna"
                  style={{ width: `${cocheSeleccionado.frenado || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando coches...</p>
      )}

      {/* Barra de navegación con desplazamiento arrastrable */}
      <div
        className="barra-navegacion"
        ref={barraRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpOrLeave}
        onMouseLeave={onMouseUpOrLeave}
      >
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
    </div>
  );
}

export default Concesionario;
