document.getElementById('apiForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que la página se recargue

    const promptInput = document.getElementById('prompt');
    const prompt = promptInput.value;
    const output = document.getElementById('output');

    // Limpia el mensaje de error o la respuesta anterior
    output.textContent = '';

    try {
        // Muestra un mensaje de carga mientras se espera la respuesta
        output.textContent = 'Cargando respuesta...';

        // Envía la solicitud al endpoint del servidor
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }), // Solo enviamos el prompt al servidor
        });

        // Verifica si la respuesta del servidor fue exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error del servidor: ${response.status} - ${errorData.error || response.statusText}`);
        }

        const result = await response.json();

        // Muestra la respuesta de la API en el frontend
        output.innerHTML = `<strong>Respuesta de la API:</strong><pre>${JSON.stringify(result, null, 2)}</pre>`;
        promptInput.value = ''; // Limpia el campo de entrada después de enviar
    } catch (error) {
        console.error('Error al conectar con el servidor o procesar la respuesta:', error);
        output.textContent = `Error: ${error.message}`;
    }
});