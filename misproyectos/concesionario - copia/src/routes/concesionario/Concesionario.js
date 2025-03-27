import React, { useState, useEffect, useRef } from 'react';
import './Concesionario.css'; // Archivo CSS actualizado

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
            <div className="velocidad-circulo">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                  style={{
                    strokeDasharray: `${(cocheSeleccionado.velocidad_punta / 500) * 100}, 100`,
                  }}
                />
              </svg>
              <p className="velocidad-texto">{cocheSeleccionado.velocidad_punta} km/h</p>
            </div>
            <h3>Características de {cocheSeleccionado.nombre_coche}</h3>
            <table className="tabla-caracteristicas">
              <tbody>
                <tr>
                  <td>Aceleración (0-100 km/h):</td>
                  <td>
                    {cocheSeleccionado.aceleracion} s
                    <div className="barra-fina-externa">
                      <div
                        className="barra-fina-interna"
                        style={{
                          width: `${Math.min((10 - cocheSeleccionado.aceleracion) * 10, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Consumo:</td>
                  <td>
                    {cocheSeleccionado.consumo} l/100 km
                    <div className="barra-fina-externa">
                      <div
                        className="barra-fina-interna"
                        style={{
                          width: `${Math.min((30 - cocheSeleccionado.consumo) * 3.33, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Par máximo:</td>
                  <td>
                    {cocheSeleccionado.newtons_par} Nm
                    <div className="barra-fina-externa">
                      <div
                        className="barra-fina-interna"
                        style={{
                          width: `${(cocheSeleccionado.newtons_par / 2000) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Caballos:</td>
                  <td>
                    {cocheSeleccionado.caballos} CV
                    <div className="barra-fina-externa">
                      <div
                        className="barra-fina-interna"
                        style={{
                          width: `${(cocheSeleccionado.caballos / 2000) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Número de marchas:</td>
                  <td>{cocheSeleccionado.numero_marchas}</td>
                </tr>
                <tr>
                  <td>Automático:</td>
                  <td>{cocheSeleccionado.automatico ? 'Sí' : 'No'}</td>
                </tr>
                <tr>
                  <td>Tiene levas:</td>
                  <td>{cocheSeleccionado.tiene_levas ? 'Sí' : 'No'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Cargando coches...</p>
      )}

      <div className="barra-navegacion-contenedor">
        <button className="flecha-izquierda" onMouseDown={() => iniciarDesplazamiento('izquierda')} onMouseLeave={detenerDesplazamiento}>
          &larr;
        </button>
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
        <button className="flecha-derecha" onMouseDown={() => iniciarDesplazamiento('derecha')} onMouseLeave={detenerDesplazamiento}>
          &rarr;
        </button>
      </div>
    </div>
  );
}

export default Concesionario;
