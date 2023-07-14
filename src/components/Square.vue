<template>
  <div
    class="square"
    :class="squareType"
    @click="$emit('selectSquare', row, column)"
  ></div>
</template>

<script>
export default {
  name: 'Square',
  data() {
    return {}
  },
  props: {
    row: {
      type: Number,
      required: true,
    },
    column: {
      type: Number,
      required: true,
    },
    start: {
      type: Object,
    },
    end: {
      type: Object,
    },
  },
  computed: {
    squareType() {
      if (this.start.row === this.row && this.start.column === this.column) {
        return 'start'
      } else if (this.end.row === this.row && this.end.column === this.column) {
        return 'end'
      } else {
        return null
      }
    },
  },
}
</script>

<style scoped>
.square {
  width: 20px;
  height: 20px;
  background-color: lightblue;
  border: 1px solid black;
  margin: 0;
}

.square:hover {
  cursor: pointer;
  filter: brightness(0.8);
}

.start {
  background-color: yellow;
}

.end {
  background-color: green;
}
</style>
