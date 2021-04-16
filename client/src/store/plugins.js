import createPersistedState from "vuex-persistedstate";

export default [
	createPersistedState({
		storage: window.sessionStorage,
		paths: ['auth', 'token', 'user']
	})
]
