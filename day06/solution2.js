const fs = require("fs");

function encontraOperador(col, entrada) {
  let encontrou = false;
  let operador = "";
  for (let i = 0; i < entrada.length; i++) {
    if (entrada[i][col] == "*" || entrada[i][col] == "+") {
      encontrou = true;
      operador = entrada[i][col];
    }
  }
  return { achou: encontrou, operador: operador };
}

function encontraDireita(esq, entrada) {
  let maiorContador = 0;
  for (let linha = 0; linha < entrada.length; linha++) {
    let count = 0;
    for (let coluna = esq + 1; coluna < entrada[linha].length; coluna++) {
      if (entrada[linha][coluna] > 0 && entrada[linha][coluna] <= 9) {
        count++;
      }
      if (entrada[linha][coluna] == " ") {
        break;
      }
    }
    if (count >= maiorContador) {
      maiorContador = count;
    }
  }
  return esq + maiorContador;
}

function extraiNumero(esq, dir, entrada) {
  let numeros = [];
  for (i = dir; i >= esq; i--) {
    let numero = "";
    for (j = 0; j < entrada.length - 1; j++) {
      if (entrada[j][i] != " ") {
        numero = numero + entrada[j][i];
      }
    }
    numeros.push(Number(numero));
  }
  return numeros;
}

function calculaOperacao(numeros, operador) {
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

function main() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const entrada = input.split(/\r?\n/);

  // const entrada = [
  //   "123 328  51 64 ",
  //   " 45 64  387 23 ",
  //   "  6 98  215 314",
  //   "*   +   *   +  ",
  // ];

  let soma = 0;

  let esq = 0;
  let dir = entrada[0].length - 1;

  for (let i = dir; i >= 0; i--) {
    if (encontraOperador(i, entrada).achou) {
      const operador = encontraOperador(i, entrada).operador;
      esq = i;
      dir = encontraDireita(esq, entrada);
      const numeros = extraiNumero(esq, dir, entrada);
      soma = soma + calculaOperacao(numeros, operador);
    }
  }
}

main();
