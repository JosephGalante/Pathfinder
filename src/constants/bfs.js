export function bfs(grid, startNode, finishNode) {
  const queue = []
  const visitedNodes = []
  startNode.distance = 0
  queue.push(startNode)
  while (queue.length != 0) {
    let currNode = queue.shift()
    if (currNode.isVisited || currNode.isWall) continue
    currNode.isVisited = true
    if (currNode.distance == Infinity) return visitedNodes
    visitedNodes.push(currNode)
    if (currNode == finishNode) return visitedNodes
    updateUnvisitedNeighbors(currNode, grid, queue)
  }
  return visitedNodes
}

function updateUnvisitedNeighbors(node, grid, queue) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
  for (let neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1
    neighbor.previousNode = node
    queue.push(neighbor)
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = []
  const { col, row } = node
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  return neighbors.filter((node) => !node.isVisited)
}

export function findTheShortestPathFromBFS(finishNode) {
  const nodesInShortestPathOrder = []
  let currNode = finishNode
  while (currNode !== null) {
    nodesInShortestPathOrder.unshift(currNode)
    currNode = currNode.previousNode
  }
  return nodesInShortestPathOrder
}
