export const state = () => ({

});

export const actions = {

}

export const mutations = {

}

export const getters = {
	isAuthenticated(state) {
		return state.auth.loggedIn;
	},
	user(state) {
		return state.auth.user;
	}
}

