import Vue from 'vue'
import App from './App.vue'

import './index.css';

Vue.config.productionTip = false

import './assets/astro.css'
import './assets/astro.core.css'

new Vue({
  render: h => h(App),
}).$mount('#app')
