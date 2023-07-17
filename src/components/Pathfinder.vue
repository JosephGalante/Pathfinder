<template>
  <v-container>
    <Header
      @resetStartEnd="resetStartEnd"
      @runSearch="runSearch"
      :readyToRun="readyToRun"
      :selectedAlgorithm="selectedAlgorithm"
      v-model:selectedAlgorithm="selectedAlgorithm"
    />

    <Legend />

    <Grid
      :rows="rows"
      :columns="columns"
      :selectedAlgorithm="selectedAlgorithm"
      v-model:start="start"
      v-model:end="end"
      v-model:grid="grid"
      :orderedVisitedSquares="orderedVisitedSquares"
      :orderedShortestPath="orderedShortestPath"
    />

    <Contact />
  </v-container>
</template>

<script>
import { dijkstra } from '../constants/dijkstra'
import { bfs } from '../constants/bfs'
import { dfs } from '../constants/dfs'
import { aStar } from '../constants/aStar'
import {
  bidirectionalDijkstra,
  findTheShortestPathFromBidirectional,
} from '../constants/bidirectionalDijkstra'
import Grid from './Grid.vue'
import Legend from './Legend.vue'
import Header from './Header.vue'
import Contact from './Contact.vue'
import { pathAlgoValues } from '../constants/algorithmNames'
import { findShortestPath } from '../constants/utilities'

export default {
  name: 'Pathfinder',
  components: {
    Header,
    Grid,
    Legend,
    Contact,
  },
  data() {
    return {
      rows: 20,
      columns: 20,
      selectedAlgorithm: null,
      start: {
        row: -1,
        column: -1,
      },
      end: {
        row: -1,
        column: -1,
      },
      grid: [],
      pathAlgoValues,
      orderedVisitedSquares: [],
      orderedShortestPath: [],
    }
  },
  methods: {
    resetStartEnd() {
      this.start = { row: -1, column: -1 }
      this.end = { row: -1, column: -1 }
      this.selectedAlgorithm = null
      this.orderedVisitedSquares = []
      this.orderedShortestPath = []

      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          this.grid[i][j].isVisited = false
          this.grid[i][j].distance = Infinity
          this.grid[i][j].isWall = false
          this.grid[i][j].previousSquare = null
        }
      }
      let visitedNodes = document.querySelectorAll('.square')

      visitedNodes.forEach((node) => {
        node.classList.remove('visited')
        node.classList.remove('on-shortest-path')
      })
    },
    runSearch() {
      switch (this.selectedAlgorithm) {
        case this.pathAlgoValues.dijkstra:
          this.runAlgorithm(dijkstra, findShortestPath)
          break
        case this.pathAlgoValues.aStar:
          this.runAlgorithm(aStar, findShortestPath)
          break
        case this.pathAlgoValues.bfs:
          this.runAlgorithm(bfs, findShortestPath)
          break
        case this.pathAlgoValues.dfs:
          this.runAlgorithm(dfs, findShortestPath)
          break
        case this.pathAlgoValues.bidirectionalDijkstra:
          this.runAlgorithm(
            bidirectionalDijkstra,
            findTheShortestPathFromBidirectional,
          )
          break
        default:
          break
      }
    },
    runAlgorithm(algorithmFn, shortestPathFn) {
      this.orderedVisitedSquares = algorithmFn(
        this.grid,
        this.startSquare,
        this.endSquare,
      )

      this.orderedShortestPath = shortestPathFn(this.endSquare)
    },
  },
  computed: {
    readyToRun() {
      return (
        this.start.row &&
        this.start.column &&
        this.end.row &&
        this.end.column &&
        !!this.selectedAlgorithm
      )
    },
    startSquare() {
      return this.grid[this.start.row - 1][this.start.column - 1]
    },
    endSquare() {
      return this.grid[this.end.row - 1][this.end.column - 1]
    },
  },
}
</script>

<style scoped></style>
