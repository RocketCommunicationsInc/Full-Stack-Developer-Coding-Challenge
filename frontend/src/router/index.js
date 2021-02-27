import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewDashboard from "@/views/ViewDashboard";
import ViewRegister from "@/views/ViewRegister";
import ViewLogin from "@/views/ViewLogin";
import ViewNotFound from "@/views/ViewNotFound";

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        component: ViewNotFound
    },
    {
        path: '/',
        name: 'Dashboard',
        component: ViewDashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: ViewRegister,
    },
    {
        path: '/login',
        name: 'Login',
        component: ViewLogin
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        const isAuthenticated = store.getters['auth/authenticated']
        if (isAuthenticated) {
            next()
        } else {
            next({path: '/login'})
        }
    } else {
        next()
    }

})

export default router
