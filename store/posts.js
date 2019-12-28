export const state = () => ({
	posts: [],
});

export const getters = {
	posts(state) {
		return state.posts;
	}
}

export const mutations = {
	SET_POSTS(state, posts) {
		state.posts = posts;
	},	
 }

export const actions = {
	async getPosts({dispatch}, topicId) {
		let response = await this.$axios.get('/topics/' + topicId + '/posts');
		dispatch('setPosts', response.data.data);
	},
	setPosts({commit}, posts) {
		commit('SET_POSTS', posts);
	},
  	async deletePost({dispatch}, data) {
  		await this.$axios.delete('/topics/' + data.topic_id + '/posts/' + data.id);
  		dispatch('topics/getTopics', {}, {root: true});
  		dispatch('topics/getTopic', data.topic_id, {root: true});
  	},
  	async create({dispatch}, data) {
  		await this.$axios.post('/topics/' + data.topic_id + '/posts', {
  			body: data.body
  		});
  		dispatch('topics/getTopic', data.topic_id, {root:true});
  	},
  	async update({dispatch}, data) {
  		await this.$axios.patch('/topics/'+ data.topic_id +'/posts/' + data.id, {
  			body: data.body
  		});
  		dispatch('topics/getTopics', {}, {root: true});
  		dispatch('topics/getTopic', data.topic_id, {root: true});
  	}
}