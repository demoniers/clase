const axios = require('axios');

async function Gemini(apiKey, prompt) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const data = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    try {
        const response = await axios.post(endpoint, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log("Respuesta de la API Gemini (axios):", response.data);
        return response.data;
    } catch (error) {
        console.error('Error al conectar con la API de Gemini (axios):', error);
        if (error.response) {
            // La solicitud fue hecha y el servidor respondió con un estado de error
            console.error('Datos del error:', error.response.data);
            console.error('Estado del error:', error.response.status);
            console.error('Cabeceras del error:', error.response.headers);
            throw new Error(`Error en la API: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error('No se recibió respuesta del servidor:', error.request);
            throw new Error('Error al conectar con la API de Gemini. No se recibió respuesta.');
        } else {
            // Algo más ocurrió al configurar la solicitud
            console.error('Error al configurar la solicitud:', error.message);
            throw new Error(`Error al configurar la solicitud: ${error.message}`);
        }
    }
}

module.exports = { Gemini };