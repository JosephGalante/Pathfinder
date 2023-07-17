<template>
  <div
    :id="`square-${row - 1}-${column - 1}`"
    class="square d-flex align-center justify-center"
    :class="{ visited: isVisited, 'on-shortest-path': isOnShortestPath }"
    @click="$emit('selectSquare', row, column)"
  >
    <v-icon
      v-if="isStartSquare || isEndSquare"
      :icon="squareIcon"
      color="black"
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
    isOnShortestPath: {
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
  background-color: white;
  border: 1px solid black;
  margin: 0;
}

.square:hover {
  cursor: pointer;
  filter: brightness(0.8);
}

.visited {
  animation: circleExpand 1s;
  background-color: green;
}

.on-shortest-path {
  background-color: yellow;
  transition: background-color 1s;
}

@keyframes circleExpand {
  0% {
    border-radius: 75%;
    transform: scale(0);
    background-color: #92ff6b;
  }
  25% {
    border-radius: 50%;
    background-color: #58df26;
  }
  50% {
    border-radius: 35%;
    background-color: #2b9e0f;
  }
  100% {
    border-radius: 12%;
    transform: scale(1);
    background-color: #0c4e07;
  }
}
</style>
