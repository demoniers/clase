async function fetchGeminiContent(apiKey, prompt) {
    const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    // Datos que se enviarán en la solicitud POST
    const data = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    try {
        const response = await fetch(`${endpoint}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Respuesta de la API Gemini:", result);
        return result; // Devuelve el resultado para manejarlo en tu aplicación
    } catch (error) {
        console.error("Error al conectarse a la API de Gemini:", error);
        return null; // Devuelve null en caso de error
    }
}

// Ejemplo de uso
const apiKey = "AIzaSyBPlQC9tbJhzodnp6EiQb7oCGRhre4fzUg"; // Sustituye con tu clave API real
const prompt = "hola"; // Sustituye con tu mensaje deseado

fetchGeminiContent(apiKey, prompt).then(result => {
    if (result) {
        console.log("Contenido generado:", result);
    } else {
        console.error("No se pudo obtener contenido de Gemini.");
    }
});

const fetch = require('node-fetch');

async function fetchGeminiContent(apiKey, prompt) {
    const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    const data = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    try {
        const response = await fetch(`${endpoint}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al conectar con la API de Gemini:', error);
        throw error;
    }
}

module.exports = { fetchGeminiContent };
