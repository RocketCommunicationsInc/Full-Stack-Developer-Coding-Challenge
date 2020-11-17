import session from '@/api/session'

export default {
	login(username, password) {
		return session.post('/rest-auth/login/', { username, password })
	},
	logout() {
		return session.post('/rest-auth/logout/', {})
	},
	getUser() {
		return session.get('/current-user')
	}
}
