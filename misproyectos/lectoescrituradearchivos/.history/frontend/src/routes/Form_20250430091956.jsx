import React, { useState } from "react";
import "./styleForm.css";

const Form = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Añade el mensaje del usuario al chat
    setMessages((prev) => [...prev, { type: "user", text: prompt }]);

    try {
      const response = await fetch("http://localhost:5000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Error en la API");
      }

      const result = await response.json();
      const apiMessage = result.candidates[0].content.parts[0].text;

      // Añade el mensaje de la API al chat
      setMessages((prev) => [...prev, { type: "api", text: apiMessage }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "api", text: "Error: " + error.message },
      ]);
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  };

  return (
    <div id="chat-container">
      <div id="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div id="form-container">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          rows="1"
        ></textarea>
        <button onClick={handleSubmit} disabled={isLoading || !prompt}>
          {isLoading ? "Enviando..." : "Enviar"}
        </button>
      </div>
      <div class="sidebar">
        <h2>Menú</h2>
        <a href="/">Inicio</a>
        <a href="/chat">Chatea</a>
        <a href="/graph">Graficos</a>
        <div class="section">
          <a href="#settings">Ajustes</a>
          <a href="#logout">Cerrar sesión</a> 
        </div>
      </div>
      <div class="sidebar-overlay"></div>
    </div>
  );
};

export default Form;
