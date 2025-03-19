import React, { useState } from 'react';
import './Concesionario.css'; // Asegúrate de crear y estilizar este archivo CSS

const coches = [
  { id: 1, nombre: 'Coche 1', imagen: 'url_coche_1.jpg' },
  { id: 2, nombre: 'Coche 2', imagen: 'url_coche_2.jpg' },
  { id: 3, nombre: 'Coche 3', imagen: 'url_coche_3.jpg' },
  // Añade más coches según sea necesario
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


