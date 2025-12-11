const fs = require("fs");

function checkInvalidPar(id, ivalidsIds) {
  id = String(id);
  const meio = Math.floor(id.length / 2);
  const esq = id.slice(0, meio);
  const dir = id.slice(meio);

  if (esq === dir) {
    ivalidsIds.push(id);
  }
}

function percorreIntervalo(intervalo, ivalidsIds) {
  const [inicio, fim] = intervalo.split("-");

  for (let i = Number(inicio); i <= Number(fim); i++) {
    if (String(i).length % 2 === 0) {
      checkInvalidPar(i, ivalidsIds);
    }
  }
}

function main() {
  let invalidIds = [];

  const input = fs.readFileSync("input.txt", "utf8").trim();
  const intervalos = input.split(",");

  let soma = 0;

  for (let i = 0; i < intervalos.length; i++) {
    percorreIntervalo(intervalos[i], invalidIds);
  }

  for (let i = 0; i < invalidIds.length; i++) {
    soma = soma + Number(invalidIds[i]);
  }

  console.log(invalidIds);

  console.log(soma);
}

main();
