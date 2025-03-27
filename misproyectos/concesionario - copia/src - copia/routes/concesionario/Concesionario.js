import React, { useState, useEffect, useRef } from 'react';
import './Concesionario.css'; // Archivo CSS actualizado

function Concesionario() {
  const [coches, setCoches] = useState([]);
  const [cocheSeleccionado, setCocheSeleccionado] = useState(null);

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
              <label>Velocidad punta:</label>
              <div className="barra-externa">
                <div
                  className="barra-interna"
                  style={{ width: `${(cocheSeleccionado.velocidad_punta / 500) * 100}%` }}
                ></div>
              </div>
              <p>{cocheSeleccionado.velocidad_punta} km/h</p>
            </div>
            <div className="barra">
              <label>Aceleración 0-100 km/h:</label>
              <div className="barra-externa">
                <div
                  className="barra-interna"
                  style={{ width: `${Math.min((10 - cocheSeleccionado.aceleracion) * 10, 100)}%` }}
                ></div>
              </div>
              <p>{cocheSeleccionado.aceleracion} s</p>
            </div>
            <div className="barra">
              <label>Consumo:</label>
              <div className="barra-externa">
                <div
                  className="barra-interna"
                  style={{ width: `${Math.min((30 - cocheSeleccionado.consumo) * 3.33, 100)}%` }}
                ></div>
              </div>
              <p>{cocheSeleccionado.consumo} l/100 km</p>
            </div>
            <div className="barra">
              <label>Newtons par:</label>
              <div className="barra-externa">
                <div
                  className="barra-interna"
                  style={{ width: `${(cocheSeleccionado.newtons_par / 2000) * 100}%` }}
                ></div>
              </div>
              <p>{cocheSeleccionado.newtons_par} Nm</p>
            </div>
            <div className="barra">
              <label>Caballos de fuerza:</label>
              <div className="barra-externa">
                <div
                  className="barra-interna"
                  style={{ width: `${(cocheSeleccionado.caballos / 2000) * 100}%` }}
                ></div>
              </div>
              <p>{cocheSeleccionado.caballos} CV</p>
            </div>
            <div className="barra">
              <label>Número de marchas:</label>
              <div className="barra-externa">
                <div
                  className="barra-interna"
                  style={{ width: `${(cocheSeleccionado.numero_marchas / 10) * 100}%` }}
                ></div>
              </div>
              <p>{cocheSeleccionado.numero_marchas}</p>
            </div>
            <div className="barra">
              <label>Automático:</label>
              <p>{cocheSeleccionado.automatico ? 'Sí' : 'No'}</p>
            </div>
            <div className="barra">
              <label>Tiene levas:</label>
              <p>{cocheSeleccionado.tiene_levas ? 'Sí' : 'No'}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando coches...</p>
      )}

      <div
        className="barra-navegacion"
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
