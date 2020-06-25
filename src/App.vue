<template>
  <div id="app">
    <h1 class="app-title">TMDB/VueJS tech demo</h1>
    <github-corners repo="dkruythoff/vue-tmdb-app"></github-corners>
    <Localeswitcher />
    <div class="search">
      <input type="text" v-model="query" />
      <button @click="trySearch">Search</button>
      <button @click="clearSearch">Clear</button>
    </div>
    <Overview />
  </div>
</template>

<script>
import {mapActions} from 'vuex'

import Overview from './components/Overview'
import Localeswitcher from './components/Localeswitcher'

export default {
  components: {
    Overview,
    Localeswitcher
  },
  data() {
    return {
      query: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions({
      init: 'tmdb/init',
      search: 'tmdb/search'
    }),
    trySearch() {
      if (this.query !== '') {
        this.search(this.query)
      }
    },
    clearSearch() {
      this.query = ''
    }
  }
}
</script>

<style lang="scss">
@import "styles/main.scss";
</style>
