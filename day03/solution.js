const fs = require("fs");

function getMaxJoltage(bank) {
  let higher = { value: 0, idx: 0 };
  let secondHigher = { value: 0, idx: 0 };

  for (let i = 0; i < bank.length - 1; i++) {
    if (bank[i] > higher.value) {
      higher.value = bank[i];
      higher.idx = i;
    }
  }

  for (let i = higher.idx + 1; i < bank.length; i++) {
    if (bank[i] > secondHigher.value) {
      secondHigher.value = bank[i];
      secondHigher.idx = i + 1;
    }
  }

  let result = String(higher.value) + String(secondHigher.value);

  return Number(result);
  return 1;
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
