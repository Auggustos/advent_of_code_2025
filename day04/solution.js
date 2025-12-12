const fs = require("fs");

function checkBoundOfPaper(line, column, positionsOfPapers) {
  let count = 0;

  function exists(l, c) {
    return positionsOfPapers.some((p) => p.linha === l && p.coluna === c);
  }

  for (let i = column - 1; i <= column + 1; i++) {
    if (exists(line - 1, i)) count++;
  }

  for (let i = column - 1; i <= column + 1; i++) {
    if (i !== column && exists(line, i)) count++;
  }

  for (let i = column - 1; i <= column + 1; i++) {
    if (exists(line + 1, i)) count++;
  }

  return count < 4;
}

function checkQuantityOfNeighbordsPapers(rollsOfPaper, positionsOfPapers) {
  count = 0;
  for (let linha = 0; linha < rollsOfPaper.length; linha++) {
    for (let coluna = 0; coluna < rollsOfPaper[linha].length; coluna++) {
      if (rollsOfPaper[linha][coluna] == "@") {
        if (checkBoundOfPaper(linha, coluna, positionsOfPapers)) {
          count++;
        }
      }
    }
  }

  return count;
}

function mapRollsOfPaper(rollsOfPaper, positionsOfPapers) {
  for (let linha = 0; linha < rollsOfPaper.length; linha++) {
    for (let coluna = 0; coluna < rollsOfPaper[linha].length; coluna++) {
      if (rollsOfPaper[linha][coluna] == "@") {
        positionsOfPapers.push({
          linha: linha,
          coluna: coluna,
        });
      }
    }
  }

  return positionsOfPapers;
}

function main() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const rollsOfPaper = input.split(/\r?\n/);

  let positionsOfPapers = [];

  mapRollsOfPaper(rollsOfPaper, positionsOfPapers);

  let count = checkQuantityOfNeighbordsPapers(rollsOfPaper, positionsOfPapers);

  console.log(count);
}

main();
