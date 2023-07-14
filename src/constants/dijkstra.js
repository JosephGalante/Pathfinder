export function dijkstra(grid, startSquare, finishSquare) {
  startSquare.distance = 0
  const orderedVisitedSquares = []
  const unvisitedSquares = findAllSquares(grid)
  while (unvisitedSquares.length !== 0) {
    sortSquaresByDistance(unvisitedSquares)
    const currentSquare = unvisitedSquares.shift()
    if (currentSquare.isWall) continue
    if (currentSquare.distance === Infinity) {
      return orderedVisitedSquares
    }
    currentSquare.isVisited = true
    orderedVisitedSquares.push(currentSquare)
    if (currentSquare === finishSquare) return orderedVisitedSquares
    updateUnvisitedNeighbors(currentSquare, grid)
  }
}

function sortSquaresByDistance(unvisitedSquares) {
  unvisitedSquares.sort(
    (squareA, squareB) => squareA.distance - squareB.distance,
  )
}

function updateUnvisitedNeighbors(square, grid) {
  const unvisitedNeighbors = findUnvisitedNeighbors(square, grid)
  for (let neighbor of unvisitedNeighbors) {
    neighbor.distance = square.distance + 1
    neighbor.previousSquare = square
  }
}

function findUnvisitedNeighbors(square, grid) {
  const neighbors = []
  const { col, row } = square
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  return neighbors.filter((square) => !square.isVisited)
}

function findAllSquares(grid) {
  const squares = []
  for (let row of grid) {
    for (let col of row) {
      squares.push(col)
    }
  }
  return squares
}

export function findShortestPath(finishSquare) {
  const squaresInShortestPathOrder = []
  let currSquare = finishSquare
  while (currSquare !== null) {
    squaresInShortestPathOrder.unshift(currSquare)
    currSquare = currSquare.previousSquare
  }
  return squaresInShortestPathOrder
}
