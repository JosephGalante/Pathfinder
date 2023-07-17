import {
  getUnvisitedNeighbors,
  findAllSquares,
  sortNodesByDistance,
} from './utilities'

export function dijkstra(grid, startSquare, finishSquare) {
  startSquare.distance = 0
  const orderedVisitedSquares = []
  const unvisitedSquares = findAllSquares(grid)
  while (unvisitedSquares.length !== 0) {
    sortNodesByDistance(unvisitedSquares)
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

function updateUnvisitedNeighbors(square, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(square, grid)
  for (let neighbor of unvisitedNeighbors) {
    neighbor.distance = square.distance + 1
    neighbor.previousSquare = square
  }
}
