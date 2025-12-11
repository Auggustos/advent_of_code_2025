const fs = require("fs");

let contador = 0;

function turnRight(current, quantity) {
  const calc = (Number(current) + Number(quantity)) % 100;
  if (calc === 0) contador++;
  return calc;
}

function turnLeft(current, quantity) {
  const calc = (Number(current) - Number(quantity) + 100) % 100;
  if (calc === 0) contador++;
  return calc;
}

function main() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const ROTATIONS = input.split(/\r?\n/);

  let current = 50;

  for (let i = 0; i < ROTATIONS.length; i++) {
    const dir = ROTATIONS[i][0];
    const quantity = Number(ROTATIONS[i].slice(1));

    if (dir === "L") {
      current = turnLeft(current, quantity);
    } else {
      current = turnRight(current, quantity);
    }
  }

  console.log("contador:", contador, "posição final:", current);
}

main();
