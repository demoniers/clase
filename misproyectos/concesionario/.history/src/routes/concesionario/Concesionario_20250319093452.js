/*import React, { useState } from 'react';
import './Concesionario.css'; // Asegúrate de crear y estilizar este archivo CSS

import coche1 from '../img/coche1.jpg';
import coche2 from '../img/coche2.jpg';
import coche3 from '../img/coche3.jpg';


const coches = [
  { id: 0, nombre: '--------' },
  { id: 1, nombre: 'Lambo', imagen: coche1 },
  { id: 2, nombre: 'Coche 2', imagen: coche2 },
  { id: 3, nombre: 'Coche 3', imagen: coche3 },
];

function Concesionario() {
  const [cocheSeleccionado, setCocheSeleccionado] = useState(coches[0]);

  const seleccionarCoche = (coche) => {
    setCocheSeleccionado(coche);
  };

  return (
    <div className="concesionario">
      <div className="imagen-grande">
        <img src={cocheSeleccionado.imagen} alt={cocheSeleccionado.nombre} />
        <h2>{cocheSeleccionado.nombre}</h2>
      </div>
      <div className="barra-navegacion">
        {coches.map((coche) => (
          <div
            key={coche.id}
            className={`tarjeta ${coche.id === cocheSeleccionado.id ? 'seleccionado' : ''}`}
            onClick={() => seleccionarCoche(coche)}
          >
            <img src={coche.imagen} alt={coche.nombre} />
            <p>{coche.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Concesionario;


*/
import React, { useState, useEffect } from 'react';
import './Concesionario.css'; // Asegúrate de crear y estilizar este archivo CSS

function Concesionario() {
  const [coches, setCoches] = useState([]); // CAMBIO: Iniciar con un array vacío
  const [cocheSeleccionado, setCocheSeleccionado] = useState(null); // CAMBIO: Inicia sin selección

  // CAMBIO: Función para obtener datos del backend
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/api/coches'); // CAMBIO: Endpoint para obtener datos
        const data = await response.json();
        setCoches(data); // CAMBIO: Guardar los datos obtenidos
        setCocheSeleccionado(data[0]); // CAMBIO: Seleccionar el primer coche por defecto
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }

    fetchData();
  }, []); // CAMBIO: Ejecutar cuando el componente se monta

  const seleccionarCoche = (coche) => {
    setCocheSeleccionado(coche); // CAMBIO: Seleccionar coche desde la lista obtenida
  };

  return (
    <div className="concesionario">
      {cocheSeleccionado ? ( // CAMBIO: Renderizar solo si hay un coche seleccionado
        <>
          <div className="imagen-grande">
            <img src={cocheSeleccionado.img_coche} alt={cocheSeleccionado.nombre_coche} />
            <h2>{cocheSeleccionado.nombre_coche}</h2>
          </div>
          <div className="barra-navegacion">
            {coches.map((coche) => (
              <div
                key={coche.id} // CAMBIO: Usar `id` de la base de datos como clave
                className={`tarjeta ${coche.id === cocheSeleccionado.id ? 'seleccionado' : ''}`}
                onClick={() => seleccionarCoche(coche)}
              >
                <img src="../im/".{coche.img_coche} alt={coche.nombre_coche} />
                <p>{coche.nombre_coche}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Cargando coches...</p> // CAMBIO: Mensaje mientras se cargan los datos
      )}
    </div>
  );
}

export default Concesionario;
