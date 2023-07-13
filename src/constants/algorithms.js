export const pathAlgorithms = [
  {
    title: 'Dijkstra',
    value: 'dijkstra',
  },
  {
    title: 'A*',
    value: 'aStar',
  },
  {
    title: 'Breadth First Search',
    value: 'bfs',
  },
  {
    title: 'Depth First Search',
    value: 'dfs',
  },
]

export const pathAlgoValues = pathAlgorithms.reduce((acc, { value }) => {
  acc[value] = value
  return acc
})
