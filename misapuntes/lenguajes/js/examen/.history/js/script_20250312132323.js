
function ejercicio1() {
  const n = prompt("Introduce un numero");
  let personas = [];
  for (let i = 1; i <= n; i++) {
    let nombre = prompt("Introduzca el nombre "+i)
    personas.push(nombre);
  }
  console.log(personas);
  while (personas.length > 0) {
    let p = prompt("Introduce un numero entre 0 y "+n);
    if (personas[p]) {
      personas.splice(p, 1);
      console.warn('Quedan '+personas.length+' nombres');
    } else {
      console.error("No hay ningún nombre almacenado en la posición "+p);
    }
  }
  alert("“Se han eliminado todos los nombres");
}
function ejercicio2() {
  let n;
  let numbers = [];
  for (let i = 0; i < 10; i++) {
    n = prompt("Introduce un numero");
    numbers.push(n);
  }
  let suma
  for (i = 0; i < numbers.length; i++) {
    suma += numbers[i];
  }
  const media = parseInt(suma)/ numbers.length;
  let confirma = confirm(`¿La media de los números introducidos es ${media}?`);
  if (confirma == true) {
    return true;
  } else {
    return false;
  }
}