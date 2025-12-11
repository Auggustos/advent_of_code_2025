const fs = require("fs");

function getMaxJoltage(bank) {
  let joltage = [];
  for (let i = 0; i < 12; i++) {
    joltage.push(0);
  }

  let iterator = 0;
  let count = 0;

  for (let limit = 11; limit >= 0; limit--) {
    for (
      let currentPosition = iterator;
      currentPosition < bank.length - limit;
      currentPosition++
    ) {
      if (bank[currentPosition] > joltage[count]) {
        joltage[count] = bank[currentPosition];
        iterator = currentPosition + 1;
      }
    }
    count++;
  }

  let result = "";

  for (let i = 0; i < joltage.length; i++) {
    result = result + joltage[i];
  }

  return Number(result);
}

function main() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const banks = input.split(/\r?\n/);

  let sum = 0;

  for (let i = 0; i < banks.length; i++) {
    sum = sum + getMaxJoltage(banks[i]);
  }

  console.log(sum);
}

main();
