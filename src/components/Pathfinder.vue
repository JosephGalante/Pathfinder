<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex justify-center">Pathfinder Algorithm App</h1>
      </v-col>
    </v-row>

    <v-row class="d-flex align-center">
      <v-col>
        <label for="alg">Graph Search Algorithm</label>
        <v-select
          label="Select"
          id="alg"
          :items="pathAlgorithms"
          v-model="selectedAlgorithm"
        >
        </v-select>
      </v-col>
      <v-col>
        <label for="height">Number of rows: {{ height }}</label>
        <v-slider
          id="height"
          min="10"
          max="100"
          v-model="height"
          step="1"
          thumb-label
        ></v-slider>
      </v-col>
      <v-col>
        <label for="width">Number of columns: {{ width }}</label>
        <v-slider
          id="width"
          min="10"
          max="100"
          v-model="width"
          step="1"
          thumb-label
        ></v-slider>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <Grid :height="height" :width="width" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Grid from './Grid.vue'
import { pathAlgoValues, pathAlgorithms } from '../constants/algorithms'

export default {
  name: 'Pathfinder',
  components: {
    Grid,
  },
  data() {
    return {
      pathAlgorithms,
      pathAlgoValues,
      selectedAlgorithm: null,
      height: 20,
      width: 20,
    }
  },
}
</script>

<style scoped>

</style>
