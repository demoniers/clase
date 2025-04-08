
function ejercicio1() {
  const n = prompt("Introduce un numero");
  let personas = [];
  for (let i = 1; i <= n; i++) {
    let nombre = prompt("Introduzca el nombre "+i)
    personas.push(nombre);
  }
  console.log(personas);
  while (personas.length > 0) {
    let p = prompt("Introduce un numero entre 0 y"+n);
    if (personas[p]) {
      personas.splice(p, 1);
      console.log('Quedan '+personas.length+' nombres');
    }
  }
}