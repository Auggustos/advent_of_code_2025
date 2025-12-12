const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim();
const rollsOfPaper = input.split(/\r?\n/);

function mapRollsOfPaper(rollsOfPaper) {
  const positions = new Set();
  for (let linha = 0; linha < rollsOfPaper.length; linha++) {
    for (let coluna = 0; coluna < rollsOfPaper[linha].length; coluna++) {
      if (rollsOfPaper[linha][coluna] === "@") {
        positions.add(`${linha},${coluna}`);
      }
    }
  }
  return positions;
}

function countNeighbors(linha, coluna, positions) {
  let count = 0;
  for (let i = linha - 1; i <= linha + 1; i++) {
    for (let j = coluna - 1; j <= coluna + 1; j++) {
      if (i === linha && j === coluna) continue;
      if (positions.has(`${i},${j}`)) count++;
    }
  }
  return count;
}

function removeLowNeighborPositions(rollsOfPaper, positions) {
  const toRemove = [];
  for (const pos of positions) {
    const [linha, coluna] = pos.split(",").map(Number);
    if (countNeighbors(linha, coluna, positions) < 4) {
      toRemove.push(pos);
    }
  }

  for (const pos of toRemove) positions.delete(pos);

  return toRemove.length;
}

function main() {
  const positions = mapRollsOfPaper(rollsOfPaper);
  const originalCount = positions.size;

  let totalRemoved = 0;

  while (true) {
    const removed = removeLowNeighborPositions(rollsOfPaper, positions);
    if (removed === 0) break;
    totalRemoved += removed;
  }

  console.log("Original:", originalCount);
  console.log("Final:", positions.size);
  console.log("Total de posições removidas:", totalRemoved);
}

main();
