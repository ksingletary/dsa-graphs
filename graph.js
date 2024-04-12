class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  addVertex(vertex) {
    this.nodes.add(vertex);
    
  }
  
  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    if (this.nodes.has(v1)) {
      v1.adjacent.add(v2);
    }

    if (this.nodes.has(v2)) {
      v2.adjacent.add(v1);
    }
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (this.nodes.has(v1)) {
      v1.adjacent.delete(v2);
    }

    if (this.nodes.has(v2)) {
      v2.adjacent.delete(v1);
    }
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (!this.nodes.has(vertex)) return;

    for (const adjacentVertex of vertex.adjacent) {
      adjacentVertex.adjacent.delete(vertex);
    }

    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const stack = [start];
    const result = [];
    const visited = new Set();
    let current;
  
    while (stack.length > 0) {
      current = stack.pop();
  
      if (!visited.has(current)) {
        visited.add(current);
        result.push(current.value);
  
        // Add all adjacent nodes to the stack in reverse order
        const adjacentArray = Array.from(current.adjacent);
        for (let i = adjacentArray.length - 1; i >= 0; i--) {
          const neighbor = adjacentArray[i];
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const queue = [start];
    const result = [];
    const visited = new Set();
    let current;

    while (queue.length > 0) {
      current = queue.shift();

      if (!visited.has(current)) {
        visited.add(current);
        result.push(current.value);

        current.adjacent.forEach(neighbor => {
          if (!visited.has(neighbor)) queue.push(neighbor);
        })
      }
    }
    return result;
  }
}


module.exports = {Graph, Node}