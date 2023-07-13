<template>
  <div v-for="i in width" :key="i" class="ma-0 pa-0 grid-container">
    <div v-for="j in height" :key="j">
      <Square />
    </div>
  </div>
</template>

<script>
import Square from './Square.vue'

export default {
  name: 'Grid',
  components: {
    Square,
  },
  props: {
    height: {
      type: Number,
      validator: (value) => {
        return value >= 10 && value <= 100
      },
    },
    width: {
      type: Number,
      validator: (value) => {
        return value >= 10 && value <= 100
      },
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
