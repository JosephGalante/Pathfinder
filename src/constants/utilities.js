export function getUnvisitedNeighbors(node, grid) {
  const neighbors = []
  const { col, row } = node
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  return neighbors.filter((node) => !node.isVisited)
}

export function findShortestPath(finishNode) {
  const nodesInShortestPathOrder = []
  let currNode = finishNode
  while (currNode) {
    nodesInShortestPathOrder.unshift(currNode)
    currNode = currNode.previousSquare
  }
  return nodesInShortestPathOrder
}

export function findAllSquares(grid) {
  const squares = []
  for (let row of grid) {
    for (let col of row) {
      squares.push(col)
    }
  }
  return squares
}

export function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}
