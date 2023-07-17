import { getUnvisitedNeighbors } from './utilities'

export function dfs(grid, startSquare, finishSquare) {
  // write an algorithm for depth first search using the grid, startSquare, and finishSquare
  // return an array of squares in the order they were visited
  // if there is no path, return an empty array

  const stack = []
  const visited = []
  stack.push(startSquare)

  while (stack.length !== 0) {
    let currSquare = stack.pop()

    if (currSquare.isVisited || currSquare.isWall) continue
    currSquare.isVisited = true
    visited.push(currSquare)

    if (currSquare === finishSquare) {
      return visited
    }

    const unvisitedNeighbors = getUnvisitedNeighbors(currSquare, grid)

    for (let neighbor of unvisitedNeighbors) {
      neighbor.previousSquare = currSquare
      stack.push(neighbor)
    }
  }

  return visited
}
