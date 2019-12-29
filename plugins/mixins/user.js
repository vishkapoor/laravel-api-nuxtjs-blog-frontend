import Vue from 'vue';
import { mapGetters } from 'vuex';

const User = {
	install(Vue, options) {
		Vue.mixin({
			computed: {
				...mapGetters({
					user: 'user',
					isAuthenticated: 'isAuthenticated'
				})
			}
		})
	}
}

Vue.use(User);