class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(node) {
    this.heap.push(node);
    this.bubbleUp();
  }

  extractMin() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown();
    return min;
  }

  bubbleUp() {
    let idx = this.heap.length - 1;
    const element = this.heap[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.heap[parentIdx];
      if (element.cost >= parent.cost) break;
      this.heap[parentIdx] = element;
      this.heap[idx] = parent;
      idx = parentIdx;
    }
  }

  sinkDown() {
    let idx = 0;
    const length = this.heap.length;
    const element = this.heap[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (leftChild.cost < element.cost) swap = leftChildIdx;
      }
      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (
          (swap === null && rightChild.cost < element.cost) ||
          (swap !== null && rightChild.cost < leftChild.cost)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.heap[idx] = this.heap[swap];
      this.heap[swap] = element;
      idx = swap;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

export const buildGraph = (data) => {
  const graph = {};
  data.forEach(item => {
    const city = Object.keys(item)[0];
    graph[city] = item[city];
  });
  return graph;
};

export const findCheapestPath = (graph, start, end, fuelPrice, autonomy) => {
  if (!graph[start] || !graph[end] || start === end) return null;

  const distances = {};
  const previous = {};
  const pq = new MinHeap();

  for (let vertex in graph) {
    if (vertex === start) {
      distances[vertex] = 0;
      pq.insert({ node: vertex, cost: 0 });
    } else {
      distances[vertex] = Infinity;
    }
    previous[vertex] = null;
  }

  while (!pq.isEmpty()) {
    const current = pq.extractMin();
    const currentNode = current.node;

    if (currentNode === end) {
      const path = [];
      let curr = end;
      while (curr) {
        path.push(curr);
        curr = previous[curr];
      }
      return { path: path.reverse(), cost: distances[end] };
    }

    if (current.cost > distances[currentNode]) continue;

    const neighbors = graph[currentNode].neighbors;
    for (let neighbor in neighbors) {
      const distanceToNeighbor = neighbors[neighbor];
      const toll = graph[neighbor].toll;
      const fuelCost = (distanceToNeighbor / autonomy) * fuelPrice;
      const edgeCost = fuelCost + toll;

      const totalCost = distances[currentNode] + edgeCost;

      if (totalCost < distances[neighbor]) {
        distances[neighbor] = totalCost;
        previous[neighbor] = currentNode;
        pq.insert({ node: neighbor, cost: totalCost });
      }
    }
  }

  return null;
};