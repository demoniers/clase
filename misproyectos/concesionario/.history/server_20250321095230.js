const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');


// VARIABLES DE SESION
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'yotengounapatata'; // Cambiar por una clave secreta segura
// ######################

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

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
app.post('/api/coches/Aniade', (req, res) => {
  // Extraer el contenido del encabezado personalizado 'Contenidos'
  const headerData = req.headers.contenidos; // Nota: 'contenidos' debe estar en minúsculas

  if (!headerData) {
    return res.status(400).json({ error: 'Falta el encabezado Contenidos' });
  }

  try {
    // Parsear el contenido del encabezado como JSON
    const data = JSON.parse(headerData);

    const {
      nombre,
      velocidad_punta,
      aceleracion,
      consumo,
      newtons_par,
      caballos,
      numero_marchas,
      automatico,
      tiene_levas,
      imagen, // El nombre de la imagen
    } = data;

    // Validar los datos (opcional, pero recomendado)
    if (!nombre || !velocidad_punta || !imagen) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    // Consulta SQL para insertar el vehículo
    const query = `
      INSERT INTO coches 
      (nombre_coche, img_coche, velocidad_punta, aceleracion, consumo, newtons_par, caballos, numero_marchas, automatico, tiene_levas) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      nombre,
      imagen,
      velocidad_punta,
      aceleracion,
      consumo,
      newtons_par,
      caballos,
      numero_marchas,
      automatico === true ? 1 : 0, // Convertir booleano a 1 o 0
      tiene_levas === true ? 1 : 0, // Convertir booleano a 1 o 0
    ];

    db.run(query, values, function (err) {
      if (err) {
        console.error('Error al insertar el vehículo:', err.message);
        return res.status(500).json({ error: 'Error al insertar los datos en la base de datos.' });
      }
      ok = true;
      res.status(200).json({ message: 'Vehículo añadido correctamente.', id: this.lastID });
    });
  } catch (err) {
    console.error('Error al parsear el encabezado Contenidos:', err.message);
    res.status(400).json({ error: 'El formato del encabezado Contenidos no es válido.' });
  }
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

// Ruta para iniciar sesión
app.post('/api/users/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
  }

  try {
    // Buscar al usuario en la base de datos
    db.get('SELECT * FROM usuarios WHERE correo = ?', [correo], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }

      // Comparar la contraseña ingresada con el hash almacenado
      const isMatch = await bcrypt.compare(contraseña, user.contraseña);
      if (isMatch) {
        // Crear un token JWT
        const token = jwt.sign({ id: user.id, tipo_usuario: user.tipo_usuario, nombre: user.nombre, apellido: user.apellido, dni: user.dni, movil: user.movil, correo: user.correo }, SECRET_KEY, { expiresIn: '1h' });

        // Responder con el token
        res.status(200).json({
          message: 'Inicio de sesión exitoso.',
          token, // Enviar el token al frontend
        });
      } else {
        res.status(401).json({ error: 'Contraseña incorrecta.' });
      }
    });
  } catch (error) {
    console.error('Error al verificar la contraseña:', error);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
});

// Ruta para verificar sesión activa
app.post('/api/users/verify', (req, res) => {
  const token = req.headers.authorization; // El token debe venir en el encabezado 'Authorization'

  if (!token) {
    return res.status(401).json({ error: 'No hay una sesión activa.' });
  }

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({
      message: 'Sesión activa.',
      userId: decoded.id,
      tipo_usuario: decoded.tipo_usuario,
      nombre: decoded.nombre,
      correo: decoded.correo,
      movil: decoded.movil,
      dni: decoded.dni,
      correo: decoded.correo,
    });
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ error: 'Sesión no válida o expirada.' });
  }
});


app.post('/api/users/logout', async (req, res) => {
  try {
    ok = true;
    return res.status(200).json({ message: 'Se ha cerrado la sesión.' });
  } catch (error) {
    console.error('Error al verificar la sesión:', error);
    res.status(500).json({ error: 'Error al verificar la sesión.' });
  }
});

// ############################################################################

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
