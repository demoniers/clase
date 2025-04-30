const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Gemini = require('./api/Gemini.js'); // Asegúrate de que el archivo esté correctamente configurado

const app = express();
const PORT = 3000; // Puedes cambiar el puerto si es necesario

// Middleware
app.use(cors()); // Permite solicitudes de otros orígenes (ideal para desarrollo)
app.use(bodyParser.json()); // Parsea JSON en las solicitudes
app.use(express.static('public')); // Sirve los archivos estáticos de la carpeta 'public'

// Endpoint para manejar solicitudes a la API de Gemini
app.post('/api/gemini', async (req, res) => {
    const { prompt, apiKey } = req.body;

    // Validación de datos de entrada
    if (!prompt || !apiKey) {
        return res.status(400).json({ error: 'Faltan el prompt o la clave API.' });
    }

    try {
        // Llama a la función para conectar con la API de Gemini
        const result = await Gemini(apiKey, prompt);
        res.json(result); // Devuelve la respuesta de la API al cliente
    } catch (error) {
        console.error('Error al conectar con la API de Gemini:', error.message);
        res.status(500).json({ error: 'Error al conectar con la API de Gemini. Por favor, inténtalo de nuevo más tarde.' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
