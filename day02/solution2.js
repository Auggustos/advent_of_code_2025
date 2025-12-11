const fs = require("fs");

function encontraPadrao(id, invalidIds) {
  id = String(id);
  const n = id.length;

  for (let size = 1; size <= n / 2; size++) {
    if (n % size === 0) {
      const padrao = id.slice(0, size);

      if (padrao.repeat(n / size) === id) {
        invalidIds.push(id);
        return;
      }
    }
  }
}

function percorreIntervalo(intervalo, ivalidsIds) {
  const [inicio, fim] = intervalo.split("-");

  for (let i = Number(inicio); i <= Number(fim); i++) {
    encontraPadrao(i, ivalidsIds);
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
