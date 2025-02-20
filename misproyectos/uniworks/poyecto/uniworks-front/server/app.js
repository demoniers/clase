const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Definir rutas
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
