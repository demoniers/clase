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
    <svg width="400" height="200">
      <rect x="50" y="100" width="300" height="50" rx="15" ry="15">
        <animate attributeName="fill" values="red;orange;yellow;green;blue" dur="5s" repeatCount="indefinite" />
      </rect>
      <rect x="100" y="70" width="200" height="40" rx="20" ry="20" fill="gray">
        <animate attributeName="fill" values="gray;silver;gray;silver" dur="5s" repeatCount="indefinite" />
      </rect>
      <circle cx="100" cy="160" r="20" fill="black" />
      <circle cx="300" cy="160" r="20" fill="black" />
    </svg>
      {cocheSeleccionado ? (
        <div className="contenido">
          <div className="imagen-grande">
            <img src={`/img/${cocheSeleccionado.img_coche}`} alt={cocheSeleccionado.nombre_coche} />
          </div>
          {/* Menú lateral con barras progresivas */}
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
                    strokeDasharray: `${
                      (cocheSeleccionado.velocidad_punta / 500) * 100
                    }, 100`,
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
                          width: `${Math.min(
                            (10 - cocheSeleccionado.aceleracion) * 10,
                            100
                          )}%`,
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
                          width: `${Math.min(
                            (30 - cocheSeleccionado.consumo) * 3.33,
                            100
                          )}%`,
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
                          width: `${
                            (cocheSeleccionado.newtons_par / 2000) * 100
                          }%`,
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
                          width: `${
                            (cocheSeleccionado.caballos / 2000) * 100
                          }%`,
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
