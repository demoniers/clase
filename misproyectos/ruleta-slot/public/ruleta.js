const ruleta = document.getElementById("ruleta");
const botonGirar = document.getElementById("girar");
const modal = document.getElementById("modal-premio");
const mensajePremio = document.getElementById("mensaje-premio");
const cerrarModal = document.getElementById("cerrar-modal");

// Función para cargar premios y generar la ruleta
fetch("/premios")
  .then((response) => response.json())
  .then((premios) => generarRuleta(premios))
  .catch((error) => console.error("Error al cargar los premios:", error));

// Genera los sectores de la ruleta
function generarRuleta(premios) {
  const numPremios = premios.length;
  const anguloSector = 360 / numPremios;

  premios.forEach((premio, index) => {
    const sector = document.createElement("div");
    sector.classList.add("sector");
    sector.style.transform = `rotate(${index * anguloSector}deg) skewY(-60deg)`;
    sector.style.background = `hsl(${Math.random() * 360}, 80%, 70%)`; // Colores aleatorios

    if (premio.img) {
      const img = document.createElement("img");
      img.src = premio.img;
      img.alt = premio.nombre;
      img.classList.add("premio-imagen");
      sector.appendChild(img);
    } else {
      const texto = document.createElement("span");
      texto.textContent = premio.nombre;
      sector.appendChild(texto);
    }

    ruleta.appendChild(sector);
  });
}

// Animación de giro de la ruleta
botonGirar.addEventListener("click", () => {
  const vueltas = Math.floor(Math.random() * 5) + 3; // 3 a 5 vueltas completas
  const anguloFinal = Math.random() * 360; // Ángulo aleatorio final
  const rotacion = vueltas * 360 + anguloFinal; // Rotación total
  ruleta.style.transition = "transform 4s cubic-bezier(0.17, 0.67, 0.83, 0.67)";
  ruleta.style.transform = `rotate(${rotacion}deg)`;

  setTimeout(() => {
    const gradosFinales = rotacion % 360;
    const indicePremio = Math.floor((360 - gradosFinales) / (360 / ruleta.childElementCount)) % ruleta.childElementCount;
    const premioGanado = ruleta.children[indicePremio].textContent || ruleta.children[indicePremio].alt;
    mostrarModal(premioGanado);
  }, 4000); // Espera el tiempo de la animación
});

// Muestra el resultado en el modal
function mostrarModal(premio) {
  mensajePremio.textContent = `¡Has ganado: ${premio}!`;
  modal.style.display = "flex";
}

// Cierra el modal
cerrarModal.addEventListener("click", () => {
  modal.style.display = "none";
});
