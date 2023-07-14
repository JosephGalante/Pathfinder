<template>
  <v-container fluid>
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
      v-model:start="start"
      v-model:end="end"
      :selectedAlgorithm="selectedAlgorithm"
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
          <li>Click the Run button</li>
        </ol>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Grid from './Grid.vue'
import PathfinderConfig from './PathfinderConfig.vue'
import Header from './Header.vue'

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
        row: null,
        column: null,
      },
      end: {
        row: null,
        column: null,
      },
    }
  },
  methods: {
    resetStartEnd() {
      this.start = { row: null, column: null }
      this.end = { row: null, column: null }
    },
    runSearch() {
      // run the pathfinding algorithm here.
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
  },
}
</script>

<style scoped>
/* if the .grid overflows horizontally, make it wrap */
.grid {
  flex-wrap: wrap;
}
</style>
