document.addEventListener("DOMContentLoaded", () => {
    const titulos = document.querySelectorAll('h3');
  
    titulos.forEach((titulo) => {
        titulo.addEventListener('click', () => {
            console.log("Vamos con los hijos");
            const bros = titulo.nextSibling; // Obtener los hijos del elemento actual
            Array.from(bros).forEach((bro) => {
              bro.classList.add("seccion"); // Aplicar la clase "seccion" a los hijos
            });
        });
    });
});
  