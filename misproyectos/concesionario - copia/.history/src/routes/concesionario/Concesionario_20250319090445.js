import React, { useState } from 'react';
import './Concesionario.css'; // Asegúrate de crear y estilizar este archivo CSS

// GESTION IMAGENES

import coche1 from '../img/coche1.jpg';
import coche2 from '../img/coche2.jpg';
import coche3 from '../img/coche3.jpg';


const coches = [
  { id: 0, nombre: '--------' },
  { id: 1, nombre: 'Lambo', imagen: coche1 },
  { id: 2, nombre: 'Coche 2', imagen: coche2 },
  { id: 3, nombre: 'Coche 3', imagen: coche3 },
  // Añade más coches según sea necesario
];

/*################################*/

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


