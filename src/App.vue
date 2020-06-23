<template>
  <div id="app">
    <h1 class="app-title">TMDB/VueJS tech demo</h1>
    <github-corners repo="dkruythoff/vue-tmdb-app"></github-corners>
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

<style lang="scss">
@import "styles/main.scss";
</style>
