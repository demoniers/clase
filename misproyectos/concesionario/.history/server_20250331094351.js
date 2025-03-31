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
app.get('/api/alquileres/:id_usuario', (req, res) => {
  const id_usuario = req.params.id_usuario;

  db.all(`
    SELECT c.*, a.id, a.fecha_inicio, a.fecha_fin, a.precio_total
    FROM alquileres a
    JOIN coches c ON a.id_coche = c.id
    WHERE a.id_usuario = ?
  `, [id_usuario], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});
app.post('/api/viewalquileres', (req, res) => {
  db.all(`
    SELECT c.*, u.id_usuario, u.*, a.id, a.fecha_inicio, a.fecha_fin, a.precio_total
    FROM alquileres a
    JOIN coches c ON a.id_coche = c.id
    JOIN usuarios u ON a.id_usuario = u.dni
  `, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});
app.post('/api/alquilar', (req, res) => {
  const { id_usuario, id_coche, fecha_inicio, fecha_fin, precio_total } = req.body;

  // Primero, actualizamos la disponibilidad del coche
  db.run('UPDATE coches SET disponible = 0 WHERE id = ?', [id_coche], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Luego, insertamos el nuevo alquiler
    db.run('INSERT INTO alquileres (id_usuario, id_coche, fecha_inicio, fecha_fin, precio_total, estado) VALUES (?, ?, ?, ?, ?, ?)', 
      [id_usuario, id_coche, fecha_inicio, fecha_fin, precio_total, 'activo'], 
      function(err) {
        if (err) {
          // Si hay un error al insertar el alquiler, revertimos el cambio en coches
          db.run('UPDATE coches SET disponible = 1 WHERE id = ?', [id_coche]);
          return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ message: "Se ha alquilado sin problema" });
      }
    );
  });
});
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
        const token = jwt.sign({ id: user.id, tipo_usuario: user.tipo_usuario, nombre: user.nombre, apellido: user.apellido, dni: user.dni, movil: user.movil, correo: user.correo, profile_img: user.profile_img }, SECRET_KEY, { expiresIn: '1h' });

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
      profile_img: decoded.profile_img
    });
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ error: 'Sesión no válida o expirada.' });
  }
});
app.post('/api/users/delete', (req, res) => {
  const token = req.headers.authorization; // El token debe venir en el encabezado 'Authorization'
  const id = req.body.identifier;
  if (!token || !id) {
    if (!token) {
      return res.status(401).json({ error: 'No hay una sesión activa.' });
    } else if (!id) {
      return res.status(401).json({ error: 'No hay usuario seleccionado.' });
    }
  }

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(token, SECRET_KEY);
    const level = decoded.tipo_usuario;
    if (level > 0) {
      db.run('DELETE FROM usuarios WHERE id = ?', [id], function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          ok = true;
          res.status(200).json({ message: 'Usuario eliminado exitosamente.', id: id });
        }
      });
    } else {
      return res.status(401).json({ error: 'No tienes permisos suficientes.' });
    }
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ error: 'Sesión no válida o expirada.' });
  }
});
// TODO funciones de administracion de usuarios 

app.post('/api/users/viewCustomers', (req, res) => {
  db.all('SELECT * FROM usuarios WHERE tipo_usuario = 0 ORDER BY nombre ASC', (err, users) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Organizar la lista de usuarios en un formato limpio para el frontend
    const listaUsers = users.map(user => ({
      id: user.id,
      tipo_usuario: user.tipo_usuario,
      nombre: user.nombre,
      apellido: user.apellido,
      dni: user.dni,
      movil: user.movil,
      correo: user.correo,
      profile_img: user.profile_img,
    }));

    // Enviar la lista al frontend
    res.status(200).json({
      message: 'Lista de usuarios obtenida correctamente.',
      usuarios: listaUsers, // Enviar la lista al frontend
    });
  });
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

/* ############################################################################*/

// ############### MANEJO DE IMAGENES #####################

const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Crear carpeta 'img' si no existe
const imgFolderProfile = path.join(__dirname, '/public/img/profile_img');
const imgFolder = path.join(__dirname, '/public/img/');
if (!fs.existsSync(imgFolder)) {
  fs.mkdirSync(imgFolder, { recursive: true }); // Crear la carpeta y subcarpetas necesarias
}
if (!fs.existsSync(imgFolderProfile)) {
  fs.mkdirSync(imgFolderProfile, { recursive: true }); // Crear la carpeta y subcarpetas necesarias
}

// Configuración de multer: guardar imágenes en la carpeta 'img'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imgFolder); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueName = file.originalname; // Puedes personalizar el nombre aquí si lo necesitas
    cb(null, uniqueName);
  },
});
const storageProfile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imgFolderProfile); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueName = file.originalname; // Puedes personalizar el nombre aquí si lo necesitas
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });
const uploadProfile = multer({ storage: storageProfile });

// Endpoint para subir imágenes
app.post('/api/upload', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se proporcionó un archivo de imagen.' });
  }

  // Responder con el nombre del archivo subido
  res.status(200).json({ imageName: req.file.filename, message: 'Imagen guardada correctamente.' });
});
app.post('/api/uploadProfile', uploadProfile.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se proporcionó un archivo de imagen.' });
  }

  // Responder con el nombre del archivo subido
  res.status(200).json({ imageName: req.file.filename, message: 'Imagen guardada correctamente.' });
});
// Endpoint para subir imágenes de perfil
/*app.post('/', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se proporcionó un archivo de imagen.' });
  }

  // Responder con el nombre del archivo subido
  res.status(200).json({ imageName: req.file.filename, message: 'Imagen guardada correctamente.' });
});*/

app.post('/api/user/update_profile_imgDB', (req, res) => {
  // Extraer el contenido del encabezado personalizado 'Contenidos'
  const headerData = req.headers.contenidos; // Nota: 'contenidos' debe estar en minúsculas

  if (!headerData) {
    return res.status(400).json({ error: 'Falta el encabezado Contenidos' });
  }

  try {
    // Parsear el contenido del encabezado como JSON
    const data = JSON.parse(headerData);

    const { userId, filename } = data; // Extraer los datos necesarios

    // Validar los datos
    if (!userId || !filename) {
      return res.status(400).json({ error: 'Datos incompletos en el encabezado Contenidos' });
    }

    // Conexión con la base de datos para actualizar la imagen de perfil
    db.run('UPDATE usuarios SET profile_img = ? WHERE id = ?', [filename, userId], function (err) {
      if (err) {
        console.error('Error al actualizar la imagen de perfil:', err.message);
        return res.status(500).json({ error: 'Error al actualizar los datos en la base de datos.' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
      ok = true;
      res.status(200).json({
        message: 'Imagen de perfil actualizada correctamente.',
      });
    });
  } catch (err) {
    console.error('Error al parsear el encabezado Contenidos:', err.message);
    res.status(400).json({ error: 'El formato del encabezado Contenidos no es válido.' });
  }
});






// ###########################################################

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
