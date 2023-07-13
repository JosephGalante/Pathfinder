<template>
  <div class="square-wrapper">
    <div class="square"></div>
  </div>
</template>

<script>
export default {
  name: 'Square',
}
</script>

<style scoped>
.square {
  width: 20px;
  height: 20px;
  background-color: lightcoral;
  border: 1px solid black;
  margin: 0;
}

.square:hover {
  cursor: pointer;
  filter: brightness(0.8);
}

.square-wrapper{
  margin: 0;
  padding: 0;
  width: 20px;
}
</style>
