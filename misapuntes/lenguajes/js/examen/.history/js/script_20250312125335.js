
function ejercicio1() {
  const n = prompt("Introduce un numero");
  let personas = [];
  for (let i = 1; i <= n; i++) {
    let nombre = prompt("Introduzca el nombre "+i)
    personas.push(nombre);
  }
  console.log(personas);
}