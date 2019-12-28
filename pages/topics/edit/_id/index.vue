<template>
<div class="row">
	<div class="col-md-6 offset-3">
		<h4>Update topic id: {{ $route.params.id }}</h4>
		<form @submit.prevent="update">
			<div class="form-group mt-5">
				<input type="text" class="form-control" v-model="topic.title">
				<small v-if="errors.title" class="form-text text-danger">
					{{ errors.title[0] }}
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
  name: 'EditTopic',
  data() {
    return {
    	topic: {
    		title: ''
    	}
    }
  },
  async asyncData(context) {
  	let response = await context.app.$axios.get('/topics/' + context.params.id);
  	return {
  		topic: response.data.data
  	}
  },
  methods: {
  	async update() {
		let yn = confirm('Are you sure you want to perform this action?')
		if(!yn) { return; }
		this.topic['id'] = this.$route.params.id
		await this.$store.dispatch('topics/update', this.topic)
		alert('Topic updated successfully.');
		this.$router.push('/topics');
  	}
  }
 }
</script>

<style lang="css" scoped>
</style>
