document.addEventListener("DOMContentLoaded", () => {
    const titulos = document.querySelectorAll('h3');
  
    titulos.forEach((titulo) => {
        titulo.addEventListener('click', () => {
            const hijos = titulo.children; // Obtener los hijos del elemento actual
            hijos.forEach((hijo) => {
              hijo.classList.add("seccion"); // Aplicar la clase "seccion" a los hijos
            });
        });
    });
});
  