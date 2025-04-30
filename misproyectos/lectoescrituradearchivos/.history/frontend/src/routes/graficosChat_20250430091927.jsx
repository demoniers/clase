import React, { useState } from 'react';
import './graficosChat.css';

const GraficosChat = () => {
    const [chartType, setChartType] = useState(''); // Tipo de gráfico
    const [inputData, setInputData] = useState(''); // Datos del gráfico
    const [svgContent, setSvgContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const fetchSVGChart = async () => {
        setErrorMessage(''); // Limpia errores anteriores

        try {
            const response = await fetch('http://localhost:5000/api/svg-chart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: chartType, data: inputData }),
            });

            if (!response.ok) {
                throw new Error('Error al obtener el gráfico del servidor.');
            }

            const svg = await response.text();
            setSvgContent(svg); // Muestra el gráfico en la pantalla
        } catch (error) {
            console.error('Error al generar el gráfico:', error);
            setErrorMessage('Error al generar el gráfico. Por favor, inténtalo nuevamente.');
        }
    };

    return (
        <div className="graficos-chat-container">
            <h1>Generador de Gráficos Interactivos</h1>
            <p>Selecciona el tipo de gráfico e ingresa los datos necesarios.</p>
            <div className="form-section">
                <input
                    type="text"
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                    placeholder="tipo formulario"
                />
                <textarea
                    rows="4"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder="Ejemplo: poblacion por comunidades autonomas españa"
                ></textarea>
                <button onClick={fetchSVGChart}>Generar Gráfico</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="svg-section" dangerouslySetInnerHTML={{ __html: svgContent }}></div>
            
      <div class="sidebar">
        <h2>Menú</h2>
        <a href="/">Inicio</a>
        <a href="/form">Chatea</a>
        <a href="/graph">Graficos</a>
        <div class="section">
          <a href="#settings">Ajustes</a>
          <a href="#logout">Cerrar sesión</a> 
        </div>
      </div>
        </div>
    );
};

export default GraficosChat;
