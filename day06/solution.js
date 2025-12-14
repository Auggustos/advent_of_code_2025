const fs = require("fs");

function checkFimConjunto(col, entrada) {
  let retorno = true;
  for (let i = 0; i < entrada.length; i++) {
    if (entrada[i][col] != " ") {
      retorno = false;
    }
  }
  return retorno;
}

function checkInicioConjunto(i, entrada) {
  return (
    entrada[entrada.length - 1][i] == "*" ||
    entrada[entrada.length - 1][i] == "+"
  );
}

function preencheNumero(esq, dir, entrada) {
  let numero = "";
  for (let i = esq; i <= dir; i++) {
    if (entrada[i] != " ") {
      numero = numero + entrada[i];
    }
  }
  return Number(numero);
}

function calculaResultadoConjunto(operador, numeros) {
  let resultado = 0;
  if (operador == "*") {
    resultado = 1;
    for (let i = 0; i < numeros.length; i++) {
      resultado = resultado * numeros[i];
    }
  } else if (operador == "+") {
    for (let i = 0; i < numeros.length; i++) {
      resultado = resultado + numeros[i];
    }
  }

  return resultado;
}

function populaNumerosColuna(esq, dir, entrada) {
  let numeros = [];
  for (let i = 0; i < entrada.length - 1; i++) {
    numeros.push(preencheNumero(esq, dir, entrada[i]));
  }
  return numeros;
}

function separaColunas(esq, dir, entrada, soma) {
  const operador = entrada[entrada.length - 1][esq];
  const numerosColunas = populaNumerosColuna(esq, dir, entrada);
  soma = soma + calculaResultadoConjunto(operador, numerosColunas);
  return soma;
}

function main() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const entrada = input.split(/\r?\n/);

  let soma = 0;

  let esq = 0;
  let dir = 0;

  for (let i = 0; i < entrada[0].length; i++) {
    if (checkInicioConjunto(i, entrada)) {
      esq = i;
    }
    if (checkFimConjunto(i, entrada)) {
      dir = i - 1;
      soma = separaColunas(esq, dir, entrada, soma);
    }
    if (i + 1 == entrada[0].length) {
      dir = i;
      soma = separaColunas(esq, dir, entrada, soma);
    }
  }

  console.log(soma);
}

main();
