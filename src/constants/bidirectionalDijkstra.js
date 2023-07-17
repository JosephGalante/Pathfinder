import { getUnvisitedNeighbors, sortNodesByDistance } from './utilities'

let unvisitedNodesFromStart = []
let unvisitedNodesFromFinish = []
let visitedNodesFromFinish = []
let visitedNodesFromStart = []
let foundByBothTarget = false
let foundNode = null
let lastNode = null

export function bidirectionalDijkstra(grid, startNode, finishNode) {
  unvisitedNodesFromStart = []
  unvisitedNodesFromFinish = []
  visitedNodesFromFinish = []
  visitedNodesFromStart = []
  foundByBothTarget = false
  foundNode = null
  lastNode = null
  startNode.distance = 0
  finishNode.distance = 0
  const visitedNodesInOrder = []
  unvisitedNodesFromFinish.push(finishNode)
  unvisitedNodesFromStart.push(startNode)

  while (
    unvisitedNodesFromStart.length !== 0 &&
    unvisitedNodesFromFinish.length !== 0
  ) {
    sortNodesByDistance(unvisitedNodesFromFinish)
    sortNodesByDistance(unvisitedNodesFromStart)

    const currNodeStart = unvisitedNodesFromStart.shift()
    const currNodeFinish = unvisitedNodesFromFinish.shift()

    if (!currNodeStart.isWall) {
      currNodeStart.isVisited = true
      visitedNodesInOrder.push(currNodeStart)
      visitedNodesFromStart.push(currNodeStart)
      if (foundByBothTarget) {
        return visitedNodesInOrder
      }
      updateUnvisitedNeighbors(
        currNodeStart,
        grid,
        unvisitedNodesFromStart,
        true,
        false,
      )
    }
    if (!currNodeFinish.isWall) {
      currNodeFinish.isVisited = true
      visitedNodesInOrder.push(currNodeFinish)
      visitedNodesFromFinish.push(currNodeFinish)
      if (foundByBothTarget) {
        return visitedNodesInOrder
      }
      updateUnvisitedNeighbors(
        currNodeFinish,
        grid,
        unvisitedNodesFromFinish,
        false,
        true,
      )
    }

    if (currNodeStart == finishNode || currNodeFinish == startNode) {
      return visitedNodesInOrder
    }
  }

  return visitedNodesInOrder
}

function updateUnvisitedNeighbors(
  node,
  grid,
  unvisitedNodes,
  isFromStart,
  isFromFinish,
) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
  for (let neighbor of unvisitedNeighbors) {
    if (neighbor.isWall) continue
    if (isFromStart) {
      if (unvisitedNodesFromFinish.includes(neighbor)) {
        foundNode = neighbor
        foundByBothTarget = true
        lastNode = node
        return
      }
    } else if (isFromFinish) {
      if (unvisitedNodesFromStart.includes(neighbor)) {
        foundNode = neighbor
        foundByBothTarget = true
        lastNode = node
        return
      }
    }
    if (
      !unvisitedNodesFromFinish.includes(neighbor) &&
      !unvisitedNodesFromStart.includes(neighbor)
    ) {
      if (!neighbor.isVisited) {
        neighbor.distance = node.distance + 1
        neighbor.previousNode = node
        unvisitedNodes.push(neighbor)
      }
    }
  }
}

export function findTheShortestPathFromBidirectional() {
  const nodesInShortestPathOrder = []
  const nodesInShortestPathOrder2 = []
  let currNode = foundNode
  let currNode2 = lastNode
  while (currNode) {
    nodesInShortestPathOrder.unshift(currNode)
    currNode = currNode.previousNode
  }
  while (currNode2) {
    nodesInShortestPathOrder2.unshift(currNode2)
    currNode2 = currNode2.previousNode
  }
  return nodesInShortestPathOrder.concat(nodesInShortestPathOrder2)
}
