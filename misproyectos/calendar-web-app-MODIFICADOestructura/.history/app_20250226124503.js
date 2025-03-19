const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const dbPath = path.join(__dirname, 'tareas.db');
const db = new sqlite3.Database(dbPath);

// Configuración del middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Crear las tablas si no existen
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tareas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descripcion TEXT NOT NULL,
      fecha DATE NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS trabajos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descripcion TEXT NOT NULL,
      diasTrabajo TEXT NOT NULL,
      pago REAL NOT NULL,
      frecuenciaPago TEXT NOT NULL,
      fechaInicio DATE,
      fechaFin DATE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS competiciones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descripcion TEXT NOT NULL,
      fechaInicio DATE NOT NULL,
      fechaFin DATE NOT NULL
    )
  `);
});

// Rutas
app.get('/', (req, res) => {
  const { mes, año } = req.query;
  const fechaActual = new Date();
  const mesSeleccionado = mes ? parseInt(mes) : fechaActual.getMonth();
  const añoSeleccionado = año ? parseInt(año) : fechaActual.getFullYear();

  db.all('SELECT * FROM tareas', [], (err, tareas) => {
    if (err) {
      throw err;
    }
    db.all('SELECT * FROM trabajos', [], (err, trabajos) => {
      if (err) {
        throw err;
      }
      db.all('SELECT * FROM competiciones', [], (err, competiciones) => {
        if (err) {
          throw err;
        }

        // Calcular las ganancias por trabajo y filtrar trabajos sin días de trabajo en el mes seleccionado
        const gananciasTrabajos = trabajos.map(trabajo => {
          const diasTrabajo = trabajo.diasTrabajo.split(',').map(d => d.trim().toLowerCase());
          const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
          const primerDiaMes = new Date(añoSeleccionado, mesSeleccionado, 1);
          const ultimoDiaMes = new Date(añoSeleccionado, mesSeleccionado + 1, 0);

          let diasPorMes = 0;
          for (let dia = primerDiaMes; dia <= ultimoDiaMes; dia.setDate(dia.getDate() + 1)) {
            let trabajoTachado = false;
            if (diasTrabajo.includes(diasSemana[dia.getDay()])) {
              competiciones.forEach(competicion => {
                const fechaInicio = new Date(competicion.fechaInicio);
                const fechaFin = new Date(competicion.fechaFin);
                if (dia >= fechaInicio && dia <= fechaFin) {
                  trabajoTachado = true;
                }
              });

              const trabajoDentroDelRango = (!trabajo.fechaInicio || dia >= new Date(trabajo.fechaInicio)) && (!trabajo.fechaFin || dia <= new Date(trabajo.fechaFin));
              if (!trabajoTachado && trabajoDentroDelRango) {
                diasPorMes++;
              }
            }
          }

          const totalDia = trabajo.frecuenciaPago === 'día' ? trabajo.pago : (trabajo.frecuenciaPago === 'mes' ? trabajo.pago / diasPorMes : 0);
          const totalMes = totalDia * diasPorMes;

          return {
            nombre: trabajo.descripcion,
            diasPorMes,
            totalMes,
            totalDia: totalDia.toFixed(2) // Formatear a dos decimales
          };
        }).filter(ganancia => ganancia.diasPorMes > 0); // Filtrar trabajos sin días de trabajo en el mes seleccionado

        res.render('index', { tareas, trabajos, competiciones, mesSeleccionado, añoSeleccionado, gananciasTrabajos });
        });
    });
  });
});

app.post('/agregar-tarea', (req, res) => {
  const { descripcion, fecha, horaInicio, horaFin } = req.body;
  db.run('INSERT INTO tareas (descripcion, fecha, horaInicio, horaFin) VALUES (?, ?, ?, ?)', [descripcion, fecha, horaInicio, horaFin], (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});

app.post('/agregar-trabajo', (req, res) => {
  const { descripcion, diasTrabajo, pago, frecuenciaPago, fechaInicio, fechaFin } = req.body;
  db.run('INSERT INTO trabajos (descripcion, diasTrabajo, pago, frecuenciaPago, fechaInicio, fechaFin) VALUES (?, ?, ?, ?, ?, ?)', [descripcion, diasTrabajo, pago, frecuenciaPago, fechaInicio, fechaFin], (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});

app.post('/agregar-competicion', (req, res) => {
  const { descripcion, fechaInicio, fechaFin } = req.body;
  db.run('INSERT INTO competiciones (descripcion, fechaInicio, fechaFin) VALUES (?, ?, ?)', [descripcion, fechaInicio, fechaFin], (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});

// VARIABLES DE GESTION
app.get('/gestion', (req, res) => {
  db.all('SELECT * FROM tareas ORDER BY fecha ASC', [], (err, tareas) => {
    if (err) {
      throw err;
    }
    db.all('SELECT * FROM trabajos ORDER BY fechaInicio ASC', [], (err, trabajos) => {
      if (err) {
        throw err;
      }
      db.all('SELECT * FROM competiciones ORDER BY fechaInicio ASC', [], (err, competiciones) => {
        if (err) {
          throw err;
        }
        res.render('gestion', { tareas, trabajos, competiciones });
      });
    });
  });
});



app.post('/actualizar-tarea', (req, res) => {
  const { id, descripcion, fecha, horaInicio, horaFin } = req.body;
  db.run('UPDATE tareas SET descripcion = ?, fecha = ?, horaInicio = ?, horaFin = ? WHERE id = ?', [descripcion, fecha, horaInicio, horaFin, id], (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/gestion');
  });
});

app.post('/actualizar-trabajo', (req, res) => {
  const { id, descripcion, diasTrabajo, pago, frecuenciaPago, fechaInicio, fechaFin } = req.body;
  db.run('UPDATE trabajos SET descripcion = ?, diasTrabajo = ?, pago = ?, frecuenciaPago = ?, fechaInicio = ?, fechaFin = ? WHERE id = ?', [descripcion, diasTrabajo, pago, frecuenciaPago, fechaInicio, fechaFin, id], (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/gestion');
  });
});
app.post('/actualizar-competicion', (req, res) => {
  const { id, descripcion, fechaInicio, fechaFin } = req.body;
  db.run('UPDATE competiciones SET descripcion = ?, fechaInicio = ?, fechaFin = ? WHERE id = ?', [descripcion, fechaInicio, fechaFin, id], (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/gestion');
  });
});
app.post('/eliminar-tarea', (req, res) => {
  const { id } = req.body;
  db.run('DELETE FROM tareas WHERE id = ?', [id], (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/gestion');
  });
});
app.post('/eliminar-trabajo', (req, res) => {
  const { id } = req.body;
  db.run('DELETE FROM trabajos WHERE id = ?', [id], (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/gestion');
  });
});
app.post('/eliminar-competicion', (req, res) => {
  const { id } = req.body;
  db.run('DELETE FROM competiciones WHERE id = ?', [id], (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/gestion');
  });
});



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
