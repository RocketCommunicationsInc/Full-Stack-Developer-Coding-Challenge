import Vue from 'vue'
import App from './App.vue'

import './assets/astro.css'
import './index.css';

import '@astrouxds/rux-global-status-bar';
import '@astrouxds/rux-clock';

Vue.config.productionTip = false

import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
