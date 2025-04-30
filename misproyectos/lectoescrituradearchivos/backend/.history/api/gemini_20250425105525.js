const fetch = require('node-fetch'); // Asegúrate de tener instalado 'node-fetch'
//const apiKey = "AIzaSyBPlQC9tbJhzodnp6EiQb7oCGRhre4fzUg";

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

        const result = await response.json();
        console.log("Respuesta de la API Gemini:", result);
        return result; // Devuelve el resultado para manejarlo en tu aplicación
    } catch (error) {
        console.error('Error al conectar con la API de Gemini:', error);
        throw error; // Propaga el error para que el llamador pueda manejarlo
    }
}

module.exports = { fetchGeminiContent };
