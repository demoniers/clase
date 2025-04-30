const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { fetchGeminiContent } = require('./api/geminiApi.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Sirve archivos estáticos de /public

// Endpoint para manejar solicitudes a la API de Gemini
app.post('/api/gemini', async (req, res) => {
    const { prompt, apiKey } = req.body;

    if (!prompt || !apiKey) {
        return res.status(400).json({ error: 'Faltan el prompt o la clave API.' });
    }

    try {
        const result = await fetchGeminiContent(apiKey, prompt);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al conectar con la API de Gemini.' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
