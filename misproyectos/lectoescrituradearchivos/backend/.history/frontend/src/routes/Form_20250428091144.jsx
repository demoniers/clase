import React, { useState } from 'react';

const Form = () => {
    const [prompt, setPrompt] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);
        setOutput('');

        try {
            const response = await fetch('http://localhost:5000/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error: ${response.statusText}`);
            }

            const result = await response.json();
            setOutput(result.candidates[0].content.parts[0].text);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
            setPrompt('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="prompt">Prompt:</label>
                <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows="4"
                    required
                    placeholder="Escribe aquí tu pregunta o instrucción"
                ></textarea>
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Enviar consulta'}
            </button>
            <div id="output">
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                {output && <pre>{output}</pre>}
            </div>
        </form>
    );
};

export default Form;
