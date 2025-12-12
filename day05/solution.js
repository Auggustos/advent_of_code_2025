const fs = require("fs");

function countValidIngredients(intervalosValidos, ingredientesDisponiveis) {
  let count = 0;

  for (let j = 0; j < ingredientesDisponiveis.length; j++) {
    const ingrediente = Number(ingredientesDisponiveis[j]);

    for (let i = 0; i < intervalosValidos.length; i++) {
      const [esq, dir] = intervalosValidos[i].split("-").map(Number);

      if (ingrediente >= esq && ingrediente <= dir) {
        count++;
        break;
      }
    }
  }

  return count;
}

function main() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const ingredientList = input.split(/\r?\n/);

  let intervalosValidos = [];
  let ingredientesDisponiveis = [];

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
    } else {
      if (ingredientList[i] != "")
        ingredientesDisponiveis.push(ingredientList[i]);
    }
  }

  let count = countValidIngredients(intervalosValidos, ingredientesDisponiveis);

  console.log(intervalosValidos);
  console.log(ingredientesDisponiveis);
  console.log(count);
}

main();
