import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import alerts from './alerts'
import contacts from './contacts'

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  	auth,
  	alerts,
  	contacts
  }
})
