<template>
  <v-row>
    <v-col>
      <div v-for="i in rows" :key="i" class="ma-0 pa-0 grid-container">
        <div v-for="j in columns" :key="j">
          <Square
            :row="i"
            :column="j"
            @selectSquare="selectSquare"
            :start="start"
            :end="end"
          />
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Square from './Square.vue'

export default {
  name: 'Grid',
  components: {
    Square,
  },
  props: {
    grid: {
      type: Array,
      required: true,
    },
    columns: {
      type: Number,
      validator: (value) => {
        return value >= 10 && value <= 100
      },
    },
    rows: {
      type: Number,
      validator: (value) => {
        return value >= 10 && value <= 100
      },
    },
    selectedAlgorithm: {
      type: String,
    },
    start: {
      type: Object,
    },
    end: {
      type: Object,
    },
    orderedVisitedSquares: {
      type: Array,
      required: true,
    },
    orderedShortestPath: {
      type: Array,
      required: true,
    },
  },
  methods: {
    initializeGrid() {
      const grid = []
      for (let i = 0; i < this.rows; i++) {
        const row = []
        for (let j = 0; j < this.columns; j++) {
          row.push(this.createSquare(i, j))
        }
        grid.push(row)
      }
      return grid
    },
    createSquare(row, col) {
      return {
        row,
        col,
        isStart: row === this.start.row && col === this.start.column,
        isEnd: row === this.end.row && col === this.end.column,
        isVisited: false,
        previousSquare: null,
        distance: Infinity,
      }
    },
    selectSquare(row, column) {
      if (this.start.row < 0 || this.start.column < 0) {
        this.$emit('update:start', { row, column })
      }

      // ensure the end coordinates are valid and not the same as the start coordinates
      else if (this.end.row < 0 || this.end.column < 0) {
        if (this.start.row !== row || this.start.column !== column) {
          this.$emit('update:end', { row, column })
        }
      }
    },
    animateSquares() {
      for (const [index, square] of this.orderedVisitedSquares.entries()) {
        setTimeout(() => {
          document
            .getElementById(`square-${square.row}-${square.col}`)
            .classList.add('visited')
        }, 30 * index)
      }

      this.waitForAnimation()
    },
    waitForAnimation() {
      setTimeout(() => {
        this.animateShortestPath()
      }, 30 * this.orderedVisitedSquares.length)
    },
    animateShortestPath() {
      for (const [index, square] of this.orderedShortestPath.entries()) {
        setTimeout(() => {
          document
            .getElementById(`square-${square.row}-${square.col}`)
            .classList.add('on-shortest-path')
        }, 30 * index)
      }
    },
  },
  mounted() {
    this.$emit('update:grid', this.initializeGrid())
  },
  watch: {
    orderedVisitedSquares() {
      this.animateSquares()
    },
    rows() {
      this.$emit('update:grid', this.initializeGrid())
    },
    columns() {
      this.$emit('update:grid', this.initializeGrid())
    },
  },
}
</script>

<style scoped>
.grid-container {
  display: flex;
  justify-content: center;
}
</style>
