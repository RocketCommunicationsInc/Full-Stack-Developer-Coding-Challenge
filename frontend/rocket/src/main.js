import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import { sync } from 'vuex-router-sync'
import auth            from '@websanova/vue-auth';
import authBasic       from '@websanova/vue-auth/dist/drivers/auth/basic.esm.js';
import httpVueResource from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js';
import routerVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js';


Vue.config.productionTip = false


/**
 * Configure Axios
 */
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://127.0.0.1:8000/'

/**
 * Configure Vue Cookies
 */
Vue.use(VueCookies)
VueCookies.config('7d')

/**
 * Assign Route and Store
 */
Vue.router = router
Vue.store = store

Vue.use(auth, {
	auth: authBasic,
	http: httpVueResource,
	router: routerVueRouter
})

const unsync = sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
