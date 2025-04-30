import { fetchGeminiContent } from './api/gemini.js';

document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = "TU_CLAVE_API"; // Sustituye con tu clave API real
    const prompt = "Explain how AI works"; // Prompt que será enviado a la API

    // Contenedor donde se mostrará la respuesta
    const responseOutput = document.getElementById('responseOutput');

    // Llama a la API de Gemini
    const result = await fetchGeminiContent(apiKey, prompt);

    // Muestra el resultado en el HTML
    if (result) {
        responseOutput.textContent = JSON.stringify(result, null, 2);
    } else {
        responseOutput.textContent = "No se pudo obtener contenido de la API.";
    }
});
