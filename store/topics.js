export const state = () => ({
	topics: [],
	topic: null,
});

export const getters = {
	links(state) {
		return state.links;
	},
	topics(state) {
		return state.topics;
	},
	topic(state) {
		return state.topic;
	}
}

export const mutations = {
	SET_LINKS(state, links) {
		state.links = links;
	},	
	SET_TOPICS(state, topics) {
		state.topics = topics;
	},
	SET_TOPIC(state, topic) {
		state.topic = topic;
	},	
 }

export const actions = {
	async getTopic({dispatch}, id) {
		let response = await this.$axios.get('/topics/' + id);
		dispatch('setTopic', response.data.data);
	},
	setTopic({commit}, topic) {
		commit('SET_TOPIC', topic);
	},
	async getTopics({dispatch}) {
		let response = await this.$axios.get('/topics');
		dispatch('setTopics', response.data.data);
	},
	setTopics({commit}, topics) {
		commit('SET_TOPICS', topics);
	},
	setLinks({commit}, links) {
		commit('SET_LINKS', links);
	},
	async paginate(context, key) {
  		if(!key) { return; }
  		let response = await this.$axios.get(key);
  		context.dispatch('setTopics', response.data.data)
  		context.dispatch('setLinks', response.data.links)
  	},
  	async deleteTopic({dispatch}, id) {
  		await this.$axios.delete('/topics/' + id);
  		dispatch('getTopics');
  	},
  	async create({dispatch}, data) {
  		await this.$axios.post('/topics', data);
  		dispatch('getTopics');
  	},
  	async update({dispatch}, data) {
  		await this.$axios.patch('/topics/' + data.id, {
  			title: data.title
  		});
  		dispatch('getTopics');
  	}
}