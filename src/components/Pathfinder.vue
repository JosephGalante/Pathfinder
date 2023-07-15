<template>
  <v-container>
    <Header />

    <PathfinderConfig
      :rows="rows"
      :columns="columns"
      :selectedAlgorithm="selectedAlgorithm"
      v-model:rows="rows"
      v-model:columns="columns"
      v-model:selectedAlgorithm="selectedAlgorithm"
    />

    <Grid
      class="grid"
      :rows="rows"
      :columns="columns"
      :selectedAlgorithm="selectedAlgorithm"
      v-model:start="start"
      v-model:end="end"
      v-model:grid="grid"
      :orderedVisitedSquares="orderedVisitedSquares"
      :orderedShortestPath="orderedShortestPath"
    />

    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn
          class="mr-2"
          variant="outlined"
          color="error"
          @click="resetStartEnd"
        >
          Cancel
        </v-btn>
        <v-btn color="blue" @click="runSearch" :disabled="!readyToRun"
          >Run</v-btn
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center">
        <ol>
          <li>
            <div class="d-flex align-center mb-3">
              <p class="mr-3">Click a starting square</p>
              <v-icon size="large" icon="fa-regular fa-circle-play" />
            </div>
          </li>
          <li>
            <div class="d-flex align-center mb-3">
              <p class="mr-3">Click an end square</p>
              <v-icon size="large" icon="fa-solid fa-flag-checkered" />
            </div>
          </li>
          <li>
            <div class="d-flex align-center mb-3">
              <p class="mr-3">Click the Run button</p>
            </div>
          </li>
        </ol>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dijkstra, findShortestPath } from '../constants/dijkstra'
import { bfs, findTheShortestPathFromBFS } from '../constants/bfs'
import { dfs } from '../constants/dfs'
import { aStar, findTheShortestPathFromAStar } from '../constants/aStar'
import {
  bidirectionalDijkstra,
  findTheShortestPathFromBidirectional,
} from '../constants/bidirectionalDijkstra'
import Grid from './Grid.vue'
import Header from './Header.vue'
import PathfinderConfig from './PathfinderConfig.vue'
import { pathAlgoValues } from '../constants/algorithmNames'

export default {
  name: 'Pathfinder',
  components: {
    Header,
    Grid,
    PathfinderConfig,
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
          this.grid[i][j].previousNode = null
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
          this.runAlgorithm(aStar, findTheShortestPathFromAStar)
          break
        case this.pathAlgoValues.bfs:
          this.runAlgorithm(bfs, findTheShortestPathFromBFS)
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
        this.selectedAlgorithm
      )
    },
    startSquare() {
      return this.grid[this.start.row - 1][this.start.column - 1]
    },
    endSquare() {
      return this.grid[this.end.row - 1][this.end.column - 1]
    },
  },
  watch: {
    animating() {
      console.log('animating changed', this.animating)
    },
  },
}
</script>

<style scoped></style>
