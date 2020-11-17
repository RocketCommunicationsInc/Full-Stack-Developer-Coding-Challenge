import session from '@/api/session'
import store from '@/store'

export default {
	alerts(filters = {}) {
		let query = this.convertQueryString(filters)
		return session.get('/alerts.json' + query)
	},
	alertsNext() {
		return session.get(store.getters['alerts/next'])
	},
	alertsPrev() {
		return session.get(store.getters['alerts/prev'])
	},
	contacts(filters = {}) {
		let query = this.convertQueryString(filters)
		return session.get('/contacts.json' + query)
	},
	contactsNext() {
		return session.get(store.getters['contacts/next'])
	},
	contactsPrev() {
		return session.get(store.getters['contacts/prev'])
	},
	convertQueryString(filters = {}) {
		let query = ''
		if (filters) {
			let str = []
			for (var i in filters) {
				if (filters.hasOwnProperty(i)) {
					str.push(encodeURIComponent(i) + '=' + encodeURIComponent(filters[i]))
				}
			}
			query = '?' + str.join('&')
		}
		return query
	}
}
