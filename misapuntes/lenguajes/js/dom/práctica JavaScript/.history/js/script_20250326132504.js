function cambiar() {
  const titulos = document.querySelectorAll("h3");

  titulos.forEach((titulo) => {
    console.log("Vamos con los hijos");
    const hijos = titulo.children; // Obtener los hijos del elemento actual
    hijos.classList.add('seccion');/*
    hijos.forEach((hijo) => {
      hijo.classList.add("seccion"); // Aplicar la clase "seccion" a los hijos
    });*/
  });
}
