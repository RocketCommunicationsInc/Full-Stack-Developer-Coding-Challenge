import Vue from 'vue'
import App from './App.vue'

import './index.css';

import '@astrouxds/rux-global-status-bar';

Vue.config.productionTip = false

import './assets/astro.css'

new Vue({
  render: h => h(App),
}).$mount('#app')
