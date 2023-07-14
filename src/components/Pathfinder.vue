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
import Grid from './Grid.vue'
import Header from './Header.vue'
import PathfinderConfig from './PathfinderConfig.vue'

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
    }
  },
  methods: {
    resetStartEnd() {
      this.start = { row: -1, column: -1 }
      this.end = { row: -1, column: -1 }
    },
    runSearch() {
      // run the path-finding algorithm here.
      this.runDijkstra()
    },
    runDijkstra() {
      const visitedSquaresInOrder = dijkstra(
        this.grid,
        this.startSquare,
        this.endSquare,
      )
      console.log(visitedSquaresInOrder)

      const orderedShortestPath = findShortestPath(this.endSquare)
      console.log(orderedShortestPath)
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
}
</script>

<style scoped>
/* if the .grid overflows horizontally, make it wrap */
.grid {
  flex-wrap: wrap;
}
</style>
