<template>
  <div id="app">
    The app
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('tmdb/init')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
