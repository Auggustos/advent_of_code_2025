const fs = require("fs");

let contador = 0;

function criarListaCircular() {
  let head = { value: 0, next: null, prev: null };
  let ultimo = head;

  for (let i = 1; i < 100; i++) {
    let novo = { value: i, next: null, prev: ultimo };
    ultimo.next = novo;
    ultimo = novo;
  }

  ultimo.next = head;
  head.prev = ultimo;

  return head;
}

function moverDireita(node, quantidade) {
  for (let i = 0; i < quantidade; i++) {
    node = node.next;
    if (node.value === 0) contador++;
  }
  return node;
}

function moverEsquerda(node, quantidade) {
  for (let i = 0; i < quantidade; i++) {
    node = node.prev;
    if (node.value === 0) contador++;
  }
  return node;
}

function main() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const ROTATIONS = input.split(/\r?\n/);

  let roleta = criarListaCircular();
  let pos = roleta;

  while (pos.value !== 50) pos = pos.next;

  for (let i = 0; i < ROTATIONS.length; i++) {
    const dir = ROTATIONS[i][0];
    const quantity = Number(ROTATIONS[i].slice(1));

    if (dir === "L") {
      pos = moverEsquerda(pos, quantity);
    } else {
      pos = moverDireita(pos, quantity);
    }
  }

  console.log("Passou pelo 0:", contador);
  console.log("Posição final:", pos.value);
}

main();
