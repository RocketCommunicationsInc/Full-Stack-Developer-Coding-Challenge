import Vue from 'vue'
import App from './App.vue'

import './assets/astro.css'
import './index.css';

import '@astrouxds/rux-global-status-bar';
import '@astrouxds/rux-clock';

Vue.config.productionTip = false

import router from './router'
import store from './store'


store.dispatch('auth/fetchUser').then(() => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
})
