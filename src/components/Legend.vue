<template>
  <v-row class="d-flex align-center">
    <v-col class="d-flex align-center">
      <v-icon icon="fa-regular fa-circle-play" size="large" class="mr-2" />
      <p>Starting square</p>
    </v-col>
    <v-col class="d-flex align-center">
      <v-icon icon="fa-solid fa-flag-checkered" size="large" class="mr-2" />
      <p>Ending square</p>
    </v-col>
    <v-col class="d-flex align-center">
      <div class="square-unvisited mr-2"></div>
      <p>Square not visited</p>
    </v-col>
    <v-col class="d-flex align-center">
      <div class="shortest-path mr-2"></div>
      <p>Square visited</p>
    </v-col>
    <v-col class="d-flex align-center">
      <div class="square-visited mr-2"></div>
      <p>Square on the shortest path</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Legend',
}
</script>

<style scoped>
.square-unvisited {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  background-color: white;
  margin: 0;
}

.square-visited {
  width: 50px;
  height: 50px;
  border: 1px solid yellow;
  background-color: yellow;
  margin: 0;
}

.shortest-path {
  width: 50px;
  height: 50px;
  border: 1px solid darkgreen;
  background-color: darkgreen;
  margin: 0;
}
</style>
