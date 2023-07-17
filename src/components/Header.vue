<template>
  <v-row class="header-stuff d-flex align-center">
    <v-col>
      <h1>Pathfinder Visualizer</h1>
    </v-col>
    <v-col>
      <label for="alg">Graph Search Algorithm</label>
      <v-select
        label="Select"
        id="alg"
        :items="pathAlgorithms"
        :modelValue="selectedAlgorithm"
        @update:modelValue="$emit('update:selectedAlgorithm', $event)"
      />
    </v-col>
    <v-col>
      <v-btn
        class="mr-2"
        variant="outlined"
        color="error"
        @click="$emit('resetStartEnd')"
      >
        Clear Board
      </v-btn>
      <v-btn color="blue" @click="$emit('runSearch')" :disabled="!readyToRun">
        Run
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { pathAlgoValues, pathAlgorithms } from '../constants/algorithmNames'

export default {
  name: 'Header',
  props: {
    readyToRun: {
      type: Boolean,
      required: true,
    },
    selectedAlgorithm: {
      type: String,
    },
  },
  data() {
    return {
      pathAlgorithms,
      pathAlgoValues,
    }
  },
}
</script>

<style scoped>
.header-stuff {
  background-color: rgb(52, 52, 52);
}
</style>
