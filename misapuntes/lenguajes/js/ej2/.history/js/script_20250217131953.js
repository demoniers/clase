alert("¡Hola Mundo 2!");
function clickTittle() {
    let nombre = prompt("has clicado en un titulo asique dime tu nombre: ");
    let titulo = document.getElementById('titulo1');
    let conf = confirm(`Su nombre es: ${nombre}`);
    if (conf == true) {
        titulo.innerHTML = `Bienvenido, ${nombre}`;
    } else {
        titulo.innerHTML = "Coño no te sabes ni tu nombre";
    }
}