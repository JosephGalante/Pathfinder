<template>
  <div
    class="square d-flex align-center justify-center"
    :class="{ 'square-visited': isVisited }"
    @click="$emit('selectSquare', row, column)"
  >
    <v-icon
      v-if="isStartSquare || isEndSquare"
      color="orange-darken-2"
      :icon="squareIcon"
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
      required: true,
    },
    end: {
      type: Object,
      required: true,
    },
    isVisited: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isStartSquare() {
      return this.start.row === this.row && this.start.column === this.column
    },
    isEndSquare() {
      return this.end.row === this.row && this.end.column === this.column
    },
    squareIcon() {
      if (this.isStartSquare) {
        return 'fa-regular fa-circle-play'
      } else if (this.isEndSquare) {
        return 'fa-solid fa-flag-checkered'
      }
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
  transition: background-color 2s;
}

.square:hover {
  cursor: pointer;
  filter: brightness(0.8);
}

.square-visited {
  animation: circleExpand 2s;
  background-color: green;
}

@keyframes circleExpand {
  0% {
    border-radius: 75%;
    transform: scale(0);
  }
  25% {
    border-radius: 50%;
  }
  50% {
    border-radius: 35%;
  }
  100% {
    border-radius: 12%;
    transform: scale(1);
  }
}
</style>
