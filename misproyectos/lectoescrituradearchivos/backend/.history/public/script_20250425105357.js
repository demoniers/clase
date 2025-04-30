document.getElementById('apiForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que la página se recargue

    const prompt = document.getElementById('prompt').value; // Toma el valor del input
    const output = document.getElementById('output');
    const apiKey = "AIzaSyBPlQC9tbJhzodnp6EiQb7oCGRhre4fzUg"; // Reemplaza con tu clave API real (si la manejas en el cliente)

    try {
        // Envía la solicitud al endpoint del servidor
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, apiKey }),
        });

        const result = await response.json();

        // Muestra el resultado o el error en el frontend
        if (result.error) {
            output.textContent = `Error: ${result.error}`;
        } else {
            output.textContent = `Respuesta de la API: ${JSON.stringify(result, null, 2)}`;
        }
    } catch (error) {
        output.textContent = 'Error al conectar con el servidor.';
        console.error(error);
    }
});
