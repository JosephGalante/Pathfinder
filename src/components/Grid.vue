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
  },
  methods: {
    selectSquare(row, column) {
      if (!this.start.row && !this.start.column) {
        this.$emit('update:start', { row, column })
      } else if (!this.end.row && !this.end.column) {
        this.$emit('update:end', { row, column })
      }
    },
  },
}
</script>

<style scoped>
.grid-container {
  display: flex;
  flex: flex-wrap;
  justify-content: center;
}
</style>
