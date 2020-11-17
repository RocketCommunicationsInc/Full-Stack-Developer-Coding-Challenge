import models from '@/api/models'
import session from '@/api/session'

import {
	FETCH_ALERTS_SUCCESS,
	SET_ALERTS
} from '@/store/types'

const initialState = {
	alerts: [],
	total: 0,
	next: null,
	previous: null,
	error: false,
	pages: 0,
	current: 0
}

const getters = {
	alerts: state => state.alerts,
	next: state => state.next,
	prev: state => state.previous,
	total: state => state.total,
	totalPages: state => state.pages,
	current: state => state.current

}

const mutations = {
	[FETCH_ALERTS_SUCCESS](state) {

	},
	[SET_ALERTS](state, alerts) {
		state.alerts = alerts.results
		state.total = alerts.count
		state.next = alerts.links.next
		state.previous = alerts.links.previous
		state.pages = alerts.pages
		state.current = (alerts.current) ? alerts.current : 1
	}
}

const actions = {
	fetchAlerts({ commit }, filters = {}) {
		return models.alerts(filters)
			.then(({ data }) => commit(SET_ALERTS, data))
			.then(() => commit(FETCH_ALERTS_SUCCESS))
	},
	fetchNext({ commit }) {
		return models.alertsNext()
			.then(({ data }) => commit(SET_ALERTS, data))
			.then(() => commit(FETCH_ALERTS_SUCCESS))
	},
	fetchPrevious({ commit }) {
		return models.alertsPrev()
			.then(({ data }) => commit(SET_ALERTS, data))
			.then(() => commit(FETCH_ALERTS_SUCCESS))
	},
}

export default {
	namespaced: true,
	state: initialState,
	getters,
	actions,
	mutations
}
