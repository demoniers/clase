const titulos = document.querySelectorAll('h3');

titulos.forEach((titulo) => {
    const hijos = titulo.children; // Obtener los hijos del elemento actual
    hijos.forEach((hijo) => {
        hijo.classList.add("seccion");
    })
});