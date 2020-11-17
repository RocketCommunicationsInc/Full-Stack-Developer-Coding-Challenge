import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '../views/Login'
import Home from '../views/Home.vue'

const requireAuthenticated = (to, from , next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (!store.getters['auth/isAuthenticated']) {
        next('/login')
      } else {
        next()
      }
    })
}

const requireUnauthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (store.getters['auth/isAuthenticated']) {
        next('/')
      } else {
        next()
      }
    });
}

const redirectLogout = (to, from, next) => {
  store.dispatch('auth/logout')
    .then(() => next('/login'))
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: requireUnauthenticated,
  },
  {
    path: '/logout',
    beforeEnter: redirectLogout,
  },
]

const router = new VueRouter({
  mode: 'history',
  saveScrollPosition: true,
  base: process.env.BASE_URL,
  routes
})

export default router
