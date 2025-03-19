const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

// Middleware para manejar datos JSON y archivos estáticos
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// Ruta para obtener los premios
app.get("/premios", (req, res) => {
  fs.readFile("./data/premios.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer los premios" });
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para guardar premios
app.post("/premios", (req, res) => {
  const nuevosPremios = req.body;
  fs.writeFile("./data/premios.json", JSON.stringify(nuevosPremios, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Error al guardar los premios" });
    }
    res.json({ success: true });
  });
});

// Ruta para cargar la página de configuración
app.get("/configuracion", (req, res) => {
  res.render("configuracion");
});

// Ruta para cargar la página de la ruleta
app.get("/ruleta", (req, res) => {
  res.render("ruleta");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
