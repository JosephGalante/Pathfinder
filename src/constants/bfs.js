import { getUnvisitedNeighbors } from './utilities'

export function bfs(grid, startNode, finishNode) {
  const queue = []
  const visitedNodes = []
  startNode.distance = 0
  queue.push(startNode)
  while (queue.length !== 0) {
    let currNode = queue.shift()
    if (currNode.isVisited || currNode.isWall) continue
    currNode.isVisited = true
    if (currNode.distance === Infinity) {
      return visitedNodes
    }
    visitedNodes.push(currNode)
    if (currNode === finishNode) {
      return visitedNodes
    }
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
