import React, { useState, useEffect, useRef } from 'react';
import './Concesionario.css';

function Concesionario() {
  const [coches, setCoches] = useState([]);
  const [cocheSeleccionado, setCocheSeleccionado] = useState(null);
  const barraRef = useRef(null); // Referencia a la barra de navegación
  const intervaloRef = useRef(null); // Referencia para controlar el intervalo de desplazamiento

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

  const iniciarDesplazamiento = (direccion) => {
    const distanciaDesplazamiento = direccion === 'derecha' ? 5 : -5; // Ajusta la velocidad de desplazamiento
    intervaloRef.current = setInterval(() => {
      if (barraRef.current) {
        barraRef.current.scrollBy({
          left: distanciaDesplazamiento,
        });
      }
    }, 10); // Cada 10ms realiza un desplazamiento
  };

  const detenerDesplazamiento = () => {
    clearInterval(intervaloRef.current); // Detiene el intervalo
  };

  return (
    <div className="concesionario">
      {cocheSeleccionado ? (
        <div className="contenido">
          <div className="imagen-grande">
            <img src={`/img/${cocheSeleccionado.img_coche}`} alt={cocheSeleccionado.nombre_coche} />
          </div>
          <div className="caracteristicas">
            <h3>Características de {cocheSeleccionado.nombre_coche}</h3>
            {/* Más contenido aquí */}
          </div>
        </div>
      ) : (
        <p>Cargando coches...</p>
      )}

      <div className="barra-navegacion-contenedor">
        {/* Botón de flecha izquierda */}
        <button
          className="flecha-izquierda"
          onMouseDown={() => iniciarDesplazamiento('izquierda')}
          onMouseUp={detenerDesplazamiento}
          onMouseLeave={detenerDesplazamiento}
        >
          &larr;
        </button>

        {/* Barra de navegación */}
        <div className="barra-navegacion" ref={barraRef}>
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

        {/* Botón de flecha derecha */}
        <button
          className="flecha-derecha"
          onMouseDown={() => iniciarDesplazamiento('derecha')}
          onMouseUp={detenerDesplazamiento}
          onMouseLeave={detenerDesplazamiento}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}

export default Concesionario;
