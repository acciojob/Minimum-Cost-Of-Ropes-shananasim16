document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.querySelector('input[type="text"]');
  const resultElement = document.querySelector("#result");

  inputElement.addEventListener("change", function () {
    const inputText = inputElement.value;
    const ropeLengths = inputText.split(',').map(Number);

    const minCost = findMinimumCost(ropeLengths);

    resultElement.textContent = minCost;
  });

  function findMinimumCost(ropeLengths) {
    // Create a min-heap to store rope lengths
    const minHeap = new MinHeap();

    // Insert all the rope lengths into the min-heap
    for (let i = 0; i < ropeLengths.length; i++) {
      minHeap.insert(ropeLengths[i]);
    }

    let minCost = 0;

    // Connect the ropes until only one rope is left in the heap
    while (minHeap.size() > 1) {
      const min1 = minHeap.extractMin();
      const min2 = minHeap.extractMin();
      const combinedLength = min1 + min2;
      minCost += combinedLength;
      minHeap.insert(combinedLength);
    }

    return minCost;
  }

  // MinHeap class to maintain the heap data structure
  class MinHeap {
    constructor() {
      this.heap = [];
    }

    size() {
      return this.heap.length;
    }

    insert(value) {
      this.heap.push(value);
      this.bubbleUp(this.heap.length - 1);
    }

    extractMin() {
      if (this.size() === 0) {
        return null;
      }
      if (this.size() === 1) {
        return this.heap.pop();
      }

      const min = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapify(0);

      return min;
    }

    bubbleUp(index) {
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.heap[index] < this.heap[parentIndex]) {
          [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
          index = parentIndex;
        } else {
          break;
        }
      }
    }

    heapify(index) {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;
      let smallest = index;

      if (leftIndex < this.size() && this.heap[leftIndex] < this.heap[smallest]) {
        smallest = leftIndex;
      }

      if (rightIndex < this.size() && this.heap[rightIndex] < this.heap[smallest]) {
        smallest = rightIndex;
      }

      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
        this.heapify(smallest);
      }
    }
  }
});
