// script.js

function minCostOfRopes() {
  const input = document.querySelector('input[type="text"]').value;
  const ropes = input.split(',').map(Number);
  const heap = [];

  // Create a min heap
  for (let i = 0; i < ropes.length; i++) {
    heap.push(ropes[i]);
  }

  heap.sort((a, b) => a - b);

  let cost = 0;

  while (heap.length > 1) {
    const first = heap.shift();
    const second = heap.shift();
    const newRope = first + second;
    cost += newRope;
    heap.push(newRope);
    heap.sort((a, b) => a - b);
  }

  document.getElementById('result').innerHTML = `Minimum cost: ${cost}`;
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  minCostOfRopes();
});