import client from "../../utils/client";

const state = {
    authenticated: false,
    user: null
}

const getters = {
    authenticated(state) {
        return state.authenticated
    },

    user(state) {
        return state.user
    },
}

const mutations = {
    SET_AUTHENTICATED(state, value) {
        state.authenticated = value
    },

    SET_USER(state, value) {
        state.user = value
    }
}

const actions = {
    async logIn({dispatch}, credentials) {
        await client.get('/csrf-cookie')
        const log = await client.post('/login', credentials)
        if (log) {

            return dispatch('fetchUser')
        } else {
            console.log(log)
        }
    },
    async logOut({ commit }) {
        try {
            await client.post('/logout')
            commit('SET_AUTHENTICATED', false)
            commit('SET_USER', null)
        } catch (e) {
            commit('SET_AUTHENTICATED', false)
            commit('SET_USER', null)
        }
    },
    async fetchUser({ commit }) {
        return client.get('/me').then(response => {
            commit('SET_AUTHENTICATED', true)
            commit('SET_USER', response.data)
        }).catch(() => {
            commit('SET_AUTHENTICATED', false)
            commit('SET_USER', null)
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
