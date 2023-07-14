<template>
  <div
    class="square d-flex align-center justify-center"
    @click="$emit('selectSquare', row, column)"
  >
    <v-icon
      v-if="isStartSquare"
      color="orange-darken-2"
      icon="fa-regular fa-circle-play"
      size="small"
    />
    <v-icon
      v-if="isEndSquare"
      color="orange-darken-2"
      icon="fa-solid fa-flag-checkered"
      size="small"
    />
  </div>
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
    isStartSquare() {
      return this.start.row === this.row && this.start.column === this.column
    },
    isEndSquare() {
      return this.end.row === this.row && this.end.column === this.column
    },
  },
}
</script>

<style scoped>
.square {
  width: 30px;
  height: 30px;
  background-color: lightblue;
  border: 1px solid black;
  margin: 0;
}

.square:hover {
  cursor: pointer;
  filter: brightness(0.8);
}
</style>
