<template>
<div class="row">
	<div class="col-md-12">
		<div class="bg-light mt-3 mb-3 topic">
			<h5>{{ topic.id }} | {{ topic.title }}</h5>
			<p class="text-muted">{{ topic.created_at }} by {{ topic.user.name }}</p>
			<posts :topic="topic"></posts>
		</div>
	</div>
	<div class="col-md-10 offset-1" v-if="isAuthenticated">
		<form @submit.prevent="create">
			<div class="form-group">
				<label for="">Add New Post</label>
				<textarea rows="7" class="form-control"
					v-model="body"></textarea>
				<small v-if="errors.body" class="form-text text-danger">
					{{ errors.body[0] }}
				</small>
			</div>
			<button 
				type="submit" 
				class="btn btn-outline-success">Add New Post</button>
			<nuxt-link to="/topics" class="btn btn-outline-info">Back to topics</nuxt-link>
		</form>
	</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import Posts from '@/components/posts';
export default {
  name: 'index',
   components: {
  	posts: Posts
  },
  data() {
    return {
    	body: ''
    };
  },
  async fetch(context) {
  	let response = await context.app.$axios.get('/topics/' + context.params.id);
  	context.store.dispatch('topics/setTopic', response.data.data);
  },
  methods: {
  	async create() {
  		let yn = confirm('Are you sure you want to perform this action?');
  		if(!yn) { return; }

  		await this.$store.dispatch('posts/create', {
  			topic_id: this.$route.params.id,
  			body: this.body
  		});
  		this.body = '';
  	}
  },
  computed: {
  	...mapGetters({
  		topic: 'topics/topic'
  	})
  }
};
</script>

<style lang="css" scoped>
.topic {
	padding:8px; 
	border-radius: 5px;
}
</style>
