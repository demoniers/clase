const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const gemini = require("./api/gemini.js"); // Asegúrate de que el archivo esté correctamente configurado
const fetch = require("node-fetch");
const { D3Node } = require("d3-node"); // Importa D3 para generar gráficos
const app = express();
const axios = require("axios");
const PORT = 5000; // Puedes cambiar el puerto si es necesario

// Middleware
app.use(cors()); // Permite solicitudes de otros orígenes (ideal para desarrollo)
app.use(bodyParser.json()); // Parsea JSON en las solicitudes
app.use(express.static("public")); // Sirve los archivos estáticos de la carpeta 'public'

// Endpoint para manejar solicitudes a la API de Gemini
app.post("/api/gemini", async (req, res) => {
  const { prompt } = req.body;
  const apiKey = "AIzaSyBPlQC9tbJhzodnp6EiQb7oCGRhre4fzUg"; // Sustituye con tu clave API real

  // Validación de datos de entrada
  if (!prompt || !apiKey) {
    return res.status(400).json({ error: "Faltan el prompt o la clave API." });
  }

  try {
    // Llama a la función para conectar con la API de Gemini
    const result = await gemini.Gemini(apiKey, prompt);
    res.json(result); // Devuelve la respuesta de la API al cliente
  } catch (error) {
    console.error("Error al conectar con la API de Gemini:", error.message);
    res
      .status(500)
      .json({
        error:
          "Error al conectar con la API de Gemini. Por favor, inténtalo de nuevo más tarde.",
      });
  }
});

app.post("/api/svg-chart", async (req, res) => {
  const apiKey = "AIzaSyBPlQC9tbJhzodnp6EiQb7oCGRhre4fzUg"; // Sustituye con tu clave API real
  //    const apiKey = process.env.API_KEY; // Usa una variable de entorno para la clave API
  const inputData = req.body.data;

  if (!inputData || typeof inputData !== "string") {
    return res
      .status(400)
      .json({
        error:
          'Datos inválidos. Debes enviar datos en formato "NombreDelCampo:ValorNumerico,...".',
      });
  }

  let prompt = `Genera un gráfico de ${inputData}. `;
  prompt +=
    "Usa el formato 'NombreDelCampo:ValorNumerico,...'. Responde únicamente con los datos para hacer el gráfico en este formato.";

  try {
    const result = await gemini.Gemini(apiKey, prompt);
    const textData = result.candidates[0].content.parts[0].text;

    // Procesar los datos recibidos
    const data = textData.split(",").map((item) => {
      const [name, value] = item.split(":");
      return { name: name.trim(), value: parseInt(value.trim(), 10) };
    });

    if (!Array.isArray(data) || data.length === 0) {
      return res
        .status(400)
        .json({
          error:
            "Datos inválidos. Verifica el formato de la respuesta de la API.",
        });
    }
    // GRAFICO DE BARRAS
        // Configuración básica del gráfico SVG
        const width = 500;
        const height = 300;
        const margin = { top: 20, right: 50, bottom: 40, left: 70 };

        const d3n = new D3Node();
        const d3 = d3n.d3;

        const x = d3
            .scaleBand()
            .domain(data.map((d) => d.name)) // Ejes con los nombres de las columnas
            .range([margin.left, width - margin.right])
            .padding(0.7);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.value)]) // Ajusta la escala con los valores
            .nice()
            .range([height - margin.bottom, margin.top]);
/*
        const svg = d3n.createSVG(width, height);

        svg
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => x(d.name))
            .attr('y', (d) => y(d.value))
            .attr('width', x.bandwidth())
            .attr('height', (d) => y(0) - y(d.value))
            .attr('fill', '#ff0510'); // Color violeta para las barras

        svg
            .append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .attr('font-size', '10px')
            .attr('color', '#f5f5f5'); // Texto blanco

        svg
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .attr('font-size', '10px')
            .attr('color', '#0550ff'); // Texto blanco
*/
const svg = d3n.createSVG(width, height);

// 📌 Dibujar las barras
svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", (d) => y(0) - y(d.value))
    .attr("fill", "#ff0510"); // Color rojo

// 📌 Dibujar el eje X
const xAxis = svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .attr("font-size", "10px")
    .attr("color", "#f5f5f5"); // Color blanco para los textos

// 🏗 Ajustar la posición de los textos en el eje X (pares e impares)
// Aquí aplicamos un ajuste dinámico para separar los textos
xAxis.selectAll("text")
    .attr("y", (d, i) => (i % 2 === 0 ? 15 : 25)) // Los pares estarán más arriba, los impares más abajo
    .attr("font-size", "10px")
    .attr("color", "#f5f5f5");

// 📌 Dibujar el eje Y
svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .attr("font-size", "10px")
    .attr("color", "#0550ff"); // Azul para el eje Y
        // Devuelve el SVG generado
        res.header('Content-Type', 'image/svg+xml');
        res.send(svg.node().outerHTML);
  } catch (error) {
    console.error("Error al conectar con la API de Gemini:", error.message);

    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res
        .status(500)
        .json({ error: "Error interno al conectar con la API de Gemini." });
    }
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
