<template>
<div class="row">
	<div class="col-md-6 offset-3">
		<h4>Update Post id: {{ $route.params.id }}</h4>
		<form @submit.prevent="update">
			<div class="form-group mt-5">
				<textarea rows="7" class="form-control" v-model="post.body"></textarea>
				<small v-if="errors.body" class="form-text text-danger">
					{{ errors.body[0] }}
				</small>
			</div>
			<button type="submit" class="btn btn-outline-success">Update</button>
			<nuxt-link class="btn btn-outline-info" to="/topics">Back to topics</nuxt-link>
		</form>
	</div>
</div>
</template>
<script>
import {  mapGetters, mapActions } from 'vuex';
export default {
  name: 'PostEdit',
  data() {
    return {
    	post: {
    		body: ''
    	}
    }
  },
  async asyncData(context) {
  	let response = await context.app.$axios.get('/topics/' 
  			+ context.params.topicId + '/posts/' + context.params.id);
  	return {
  		post: response.data.data
  	}
  },
  methods: {
  	async update() {
		let yn = confirm('Are you sure you want to perform this action?')
		if(!yn) { return; }
		await this.$store.dispatch('posts/update', this.post)
		alert('Post updated successfully.');
		this.$router.back();
  	}
  }
 }
</script>

<style lang="css" scoped>
</style>
