<template>
  <div id="app">
    <Localeswitcher />
    <Overview />
  </div>
</template>

<script>
import Overview from './components/Overview'
import Localeswitcher from './components/Localeswitcher'

export default {
  components: {
    Overview,
    Localeswitcher
  },
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
