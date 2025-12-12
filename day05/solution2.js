const fs = require("fs");

function countPossibleValidIngredients(mergedIntervals) {
  let count = 0;
  for (let i = 0; i < mergedIntervals.length; i++) {
    count = count + (mergedIntervals[i].dir - mergedIntervals[i].esq) + 1;
  }
  return count;
}

function mergeIntervals(intervalos) {
  let ranges = intervalos.map((intervalo) => {
    const [esq, dir] = intervalo.split("-").map(Number);
    return { esq, dir };
  });

  for (let i = 0; i < ranges.length - 1; i++) {
    for (let j = 0; j < ranges.length - 1 - i; j++) {
      if (ranges[j].esq > ranges[j + 1].esq) {
        const temp = ranges[j];
        ranges[j] = ranges[j + 1];
        ranges[j + 1] = temp;
      }
    }
  }

  let merged = [];
  let current = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const next = ranges[i];

    if (next.esq <= current.dir + 1) {
      if (next.dir >= current.dir) {
        current.dir = next.dir;
      }
    } else {
      merged.push(current);
      current = next;
    }
  }

  merged.push(current);

  return merged;
}

function main() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const ingredientList = input.split(/\r?\n/);

  let intervalosValidos = [];

  // const ingredientList = [
  //   "3-5",
  //   "10-14",
  //   "16-20",
  //   "12-18",
  //   "",
  //   "1",
  //   "5",
  //   "8",
  //   "11",
  //   "17",
  //   "32",
  // ];

  for (let i = 0; i < ingredientList.length; i++) {
    if (ingredientList[i].split("-").length == 2) {
      intervalosValidos.push(ingredientList[i]);
    }
  }
  const mergedIntervals = mergeIntervals(intervalosValidos);

  let count = countPossibleValidIngredients(mergedIntervals);

  console.log(count);
}

main();
