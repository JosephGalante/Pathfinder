export function aStar(grid, startNode, finishNode) {
  let openList = []
  let closedList = []
  startNode.distance = 0
  startNode.heuristic = 0
  startNode.totalDistance = 0
  openList.push(startNode)
  while (openList.length != 0) {
    let currentNode = findClosest(openList)

    if (currentNode === finishNode) {
      return closedList
    }
    if (currentNode.distance === Infinity) {
      return closedList
    }
    openList = removeFromArray(currentNode, openList)
    if (currentNode.isWall) continue
    currentNode.isVisited = true
    updateNeighbors(currentNode, grid, openList, finishNode, closedList)
    closedList.push(currentNode)
  }
  return closedList
}

function findClosest(openList) {
  let currentClosest, index
  for (let i = 0; i < openList.length; i++) {
    if (
      !currentClosest ||
      currentClosest.totalDistance > openList[i].totalDistance
    ) {
      currentClosest = openList[i]
      index = i
    } else if (currentClosest.totalDistance === openList[i].totalDistance) {
      if (currentClosest.heuristic > openList[i].heuristic) {
        currentClosest = openList[i]
        index = i
      }
    }
  }
  openList.splice(index, 1)
  return currentClosest
}

function removeFromArray(node, list) {
  let newOpenList = []
  for (let i = 0; i < list.length; i++) {
    if (!(node === list[i])) {
      newOpenList.push(list[i])
    }
  }
  return newOpenList
}

function updateNeighbors(
  node,
  grid,
  openList,

  finishNode,
  closedList,
) {
  let neighbors = getNeighbors(node, grid)
  for (let neighbor of neighbors) {
    if (!closedList.includes(neighbor)) {
      let temp = node.distance + 1
      let newPath = false
      if (openList.includes(neighbor)) {
        if (temp < neighbor.distance) {
          neighbor.distance = temp
          newPath = true
        }

        openList.push(neighbor)
      } else {
        neighbor.distance = temp
        openList.push(neighbor)
        newPath = true
      }

      if (newPath) {
        neighbor.heuristic = manhattanDistance(neighbor, finishNode)
        neighbor.totalDistance = neighbor.distance + neighbor.heuristic
        neighbor.previousNode = node
      }
    }
  }
}

function getNeighbors(node, grid) {
  const neighbors = []
  const { col, row } = node
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])

  return neighbors.filter((node) => !node.isVisited)
}

function manhattanDistance(nodeOne, nodeTwo) {
  let x = Math.abs(nodeOne.row - nodeTwo.row)
  let y = Math.abs(nodeOne.col - nodeTwo.col)

  return x + y
}

export function findTheShortestPathFromAStar(finishNode) {
  const nodesInShortestPathOrder = []
  let currNode = finishNode
  while (currNode !== null) {
    nodesInShortestPathOrder.unshift(currNode)
    currNode = currNode.previousNode
  }
  if (nodesInShortestPathOrder.length < 1) {
    return []
  }
  return nodesInShortestPathOrder
}
