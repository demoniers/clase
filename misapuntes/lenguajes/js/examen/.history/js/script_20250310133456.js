
let myArray = [];
function clickTittle() {
    let n1 = prompt("introduzca el primer valor para operar: ");
    let n2 = prompt("introduzca el segundo valor para operar: ");
    let operador;
  
    do {
      operador = prompt("Introduzca el tipo de operacion (+, -, *, /)");
      console.log(operador);
    } while (
      operador !== "*" &&
      operador !== "/" &&
      operador !== "+" &&
      operador !== "-"
    );
  
    let resultado = eval(`${n1} ${operador} ${n2}`);
    myArray.push({
      digito1: n1,
      operador: operador,
      digito2: n2,
      resultado: resultado
    });
    
    console.log(resultado);
    if (resultado) {
      let titulo = document.getElementById("titulo1");
      titulo.innerHTML = `${n1} ${operador} ${n2} =  ${resultado}`;
    } else {
      alert("que desastre de verdad, ¡¡DEJALO!!");
    }
}

function esPrimo() {
  let num = prompt("Introduce el numero a comprobar");
  let rs = 0;
  for (let i=1; i<num; i++) {
    if ((num % i) == 0) {
      rs++;
    }
    if (rs > 2) {
      break;
    }
  }
  if (rs > 2) {
    alert("el numero no es primo");
  } else {
    alert("el numero es primo")
  }
}