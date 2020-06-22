import Vue from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './i18n'
import VueGitHubCorners from 'vue-gh-corners';

// Import GitHub Corners stylesheet.
import 'vue-gh-corners/dist/vue-github-corners.iife.css';

Vue.use(VueGitHubCorners);

Vue.config.productionTip = false

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
