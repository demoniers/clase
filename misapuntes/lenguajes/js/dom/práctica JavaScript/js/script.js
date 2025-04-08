document.addEventListener("DOMContentLoaded", () => {
    const titulos = document.querySelectorAll('h3');
  
    titulos.forEach((titulo) => {
        titulo.addEventListener('click', () => {
            console.log("Vamos con el siguiente hermano");
            const hermano = titulo.nextElementSibling; // Hermano siguiente que sea un elemento
            if (hermano) {
                hermano.classList.add("seccion"); // Aplicar la clase "seccion"
            }
        });
    });
    const aniade = document.getElementsByTagName("button");
    aniade.addEventListener('click', () => {
        
    })
});
