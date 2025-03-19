const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a SQLite
const db = new sqlite3.Database('./coches.db', (err) => {
  if (err) {
    console.error('Error al conectar con SQLite:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

// Crear tabla si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS coches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_coche TEXT NOT NULL,
    img_coche TEXT NOT NULL
  )
`);

// Endpoint para obtener los coches
app.get('/api/coches', (req, res) => {
  db.all('SELECT * FROM coches', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// GESTION USUARIOS #################################
app.post('/api/users/singin', async (req, res) => {
  const { nombre, apellido, dni, correo, movil, tipo_usuario, contraseña } = req.body;

  if (!nombre || !apellido || !dni || !correo || !movil || !tipo_usuario || !contraseña) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    // Cifrar la contraseña con bcrypt
    const saltRounds = 10; // Número de rondas para generar el salt
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    // Insertar el usuario en la base de datos con la contraseña cifrada
    db.run(
      'INSERT INTO usuarios (nombre, apellido, dni, correo, movil, tipo_usuario, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, dni, correo, movil, tipo_usuario, hashedPassword],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          ok = true;
          res.status(201).json({ message: 'Usuario registrado exitosamente.', id: this.lastID });
        }
      }
    );
  } catch (error) {
    console.error('Error al cifrar la contraseña:', error);
    res.status(500).json({ error: 'Error al registrar el usuario.' });
  }
});


app.post('/api/users/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
  }

  try {
    // Buscar al usuario en la base de datos
    db.get('SELECT * FROM usuarios WHERE correo = ?', [correo], async (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado.' });
      } else {
        // Comparar la contraseña ingresada con el hash almacenado
        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (isMatch) {
          res.status(200).json({ message: 'Inicio de sesión exitoso.' });
        } else {
          res.status(401).json({ error: 'Contraseña incorrecta.' });
        }
      }
    });
  } catch (error) {
    console.error('Error al verificar la contraseña:', error);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
});

// ############################################################################

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
