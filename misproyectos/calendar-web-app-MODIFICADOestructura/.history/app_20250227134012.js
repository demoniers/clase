const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const dbPath = path.join(__dirname, 'tareas.db');
const db = new sqlite3.Database(dbPath);
const routes = require('./routers');

// Configuración del middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(routes);


function contarDiasTrabajo(diasTrabajo, mes, año) {
  const dias = diasTrabajo.split(',').map(d => d.trim().toLowerCase());
  const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  let contador = 0;

  const primerDiaMes = new Date(año, mes, 1);
  const ultimoDiaMes = new Date(año, mes + 1, 0);

  for (let dia = primerDiaMes; dia <= ultimoDiaMes; dia.setDate(dia.getDate() + 1)) {
    if (dias.includes(diasSemana[dia.getDay()])) {
      contador++;
    }
  }

  return contador;
}

// Servidor en puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
