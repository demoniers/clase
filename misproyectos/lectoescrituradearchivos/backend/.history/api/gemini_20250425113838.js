const fetch = require('node-fetch'); // Asegúrate de tener instalado 'node-fetch'

// Clave API (reemplázala con tu clave API válida)
const apiKey = "TU_CLAVE_API"; 

async function Gemini(apiKey, prompt) {
    const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    // Datos que se enviarán en la solicitud POST
    const data = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    try {
        // Realiza la solicitud POST al endpoint
        const response = await fetch(`${endpoint}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Verifica si la respuesta tiene un código de estado no exitoso
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
        }

        // Parsea el resultado como JSON
        const result = await response.json();
        console.log("Respuesta de la API Gemini:", result);
        return result; // Devuelve el resultado para manejarlo en tu aplicación
    } catch (error) {
        // Muestra el error en consola y lo propaga
        console.error('Error al conectar con la API de Gemini:', error.message);
        throw error; // Propaga el error para que el llamador pueda manejarlo
    }
}

// Ejemplo de uso (asegúrate de reemplazar el prompt y la clave API válidos)
(async () => {
    const prompt = "hola"; // Reemplaza con el mensaje que quieras enviar
    try {
        const result = await fetchGeminiContent(apiKey, prompt);
        console.log("Contenido generado por la API Gemini:", result);
    } catch (error) {
        console.error("No se pudo obtener contenido de Gemini:", error.message);
    }
})();

module.exports = { Gemini };
