export function dfs(grid, startSquare, finishSquare) {
  // write an algorithm for depth first search using the grid, startSquare, and finishSquare
  // return an array of squares in the order they were visited
  // if there is no path, return an empty array

  // create a stack
  const stack = []

  // create a visited array
  const visited = []

  // push the startSquare to the stack
  stack.push(startSquare)

  // while the stack is not empty
  while (stack.length !== 0) {
    // pop a square off the stack
    let currSquare = stack.pop()

    // if the square is visited or a wall, continue
    if (currSquare.isVisited || currSquare.isWall) continue

    // mark the square as visited
    currSquare.isVisited = true

    // push the square to the visited array
    visited.push(currSquare)

    // if the square is the finishSquare, return the visited array
    if (currSquare === finishSquare) {
      return visited
    }

    // get the unvisited neighbors of the square
    const unvisitedNeighbors = getUnvisitedNeighbors(currSquare, grid)

    // for each neighbor
    for (let neighbor of unvisitedNeighbors) {
      // set the neighbor's previous square to the current square
      neighbor.previousSquare = currSquare

      // push the neighbor to the stack
      stack.push(neighbor)
    }
  }

  // return the visited array
  return visited
}

function getUnvisitedNeighbors(square, grid) {}
