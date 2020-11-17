import models from '@/api/models'
import session from '@/api/session'

import {
	FETCH_CONTACTS_SUCCESS,
	SET_CONTACTS
} from '@/store/types'

const initialsState = {
	contacts: [],
	total: 0,
	next: null,
	previous: null,
	error: false,
	states: [],
	pages: 0,
	current: 0,
}

const getters = {
	contacts: state => state.contacts,
	total: state => state.total,
	states: state => state.states,
	next: state => state.next,
	prev: state => state.previous,
	totalPages: state => state.pages,
	current: state => state.current
}

const mutations = {
	[FETCH_CONTACTS_SUCCESS](state) {

	},
	[SET_CONTACTS](state, contacts) {
		state.contacts = contacts.results
		state.total = contacts.count
		state.next = contacts.links.next
		state.previous = contacts.links.previous
		state.states = contacts.states
		state.pages = contacts.pages
		state.current = (contacts.current) ? contacts.current : 1
	}
}

const actions = {
	fetchContacts({ commit }, filters = {}) {
		return models.contacts(filters)
			.then(({ data }) => commit(SET_CONTACTS, data))
			.then(() => commit(FETCH_CONTACTS_SUCCESS))
	},
	fetchNext({ commit }) {
		return models.contactsNext()
			.then(({ data }) => commit(SET_CONTACTS, data))
			.then(() => commit(FETCH_CONTACTS_SUCCESS))
	},
	fetchPrevious({ commit }) {
		return models.contactsPrev()
			.then(({ data }) => commit(SET_CONTACTS, data))
			.then(() => commit(FETCH_CONTACTS_SUCCESS))
	}
}

export default {
	namespaced: true,
	state: initialsState,
	getters,
	actions,
	mutations
}
