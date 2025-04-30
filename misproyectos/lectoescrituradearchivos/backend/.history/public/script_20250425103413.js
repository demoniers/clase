document.getElementById('apiForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const prompt = document.getElementById('prompt').value;
    const output = document.getElementById('output');
    const apiKey = 'TU_CLAVE_API'; // Sustituye con tu clave API real

    try {
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, apiKey }),
        });

        const result = await response.json();

        output.textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        output.textContent = 'Error al conectar con el servidor.';
        console.error(error);
    }
});
