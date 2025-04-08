
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
  let suma = 0;
  for (i = 0; i < numbers.length; i++) {
    let num = parseInt(numbers[i]);
    suma = suma + num;
  }
  suma = parseInt(suma);
  let total = parseInt(numbers.length);
  const media = suma / total;
  let confirma = confirm(`¿La media de los números introducidos es ${media}?`);
  if (confirma == true) {
    return true;
  } else {
    return false;
  }
}
function funciones() {
  alert("Hay dos funciones 1. ejercicio 1        2. ejercicio2");
  let seleccion = prompt("introduce 1 = ejercico1 o 2 = ejercicio2 o 3 = salir");
  switch (seleccion) {
    case 1:
      ejercicio1();
      break;
    case 2:
      ejercicio2();
      break;
    case 3:
      break;
  }
}