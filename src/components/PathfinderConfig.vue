<template>
  <v-row class="d-flex align-center">
    <v-col>
      <label for="alg">Graph Search Algorithm</label>
      <v-select
        label="Select"
        id="alg"
        :items="pathAlgorithms"
        :modelValue="selectedAlgorithm"
        @update:modelValue="$emit('update:selectedAlgorithm', $event)"
      >
      </v-select>
    </v-col>
    <v-col>
      <label for="rows">Number of rows: {{ rows }}</label>
      <v-slider
        id="rows"
        min="10"
        max="100"
        :modelValue="rows"
        @update:modelValue="$emit('update:rows', $event)"
        step="1"
        thumb-label
      ></v-slider>
    </v-col>
    <v-col>
      <label for="columns">Number of columns: {{ columns }}</label>
      <v-slider
        id="columns"
        min="10"
        max="100"
        :modelValue="columns"
        @update:modelValue="$emit('update:columns', $event)"
        step="1"
        thumb-label
      ></v-slider>
    </v-col>
  </v-row>
</template>

<script>
import { pathAlgoValues, pathAlgorithms } from '../constants/algorithmNames'

export default {
  name: 'PathfinderConfig',
  props: {
    rows: {
      type: Number,
      validator: (value) => {
        return value >= 10 && value <= 100
      },
    },
    columns: {
      type: Number,
      validator: (value) => {
        return value >= 10 && value <= 100
      },
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

<style scoped></style>
../constants/algorithmNames