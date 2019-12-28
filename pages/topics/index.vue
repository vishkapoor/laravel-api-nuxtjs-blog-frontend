<template>
<div class="row">
	<div class="col-md-12">
		<h4>Topics
			<span class="float-right">
				<nuxt-link 
					class="btn btn-primary btn-sm"
				to="/topics/create">Create New Topic</nuxt-link>
			</span>
		</h4>
		<div v-for="(topic,index) in topics" 
			:key="index" class="bg-light mt-3 mb-3 topics">
			<h5>
				<nuxt-link :to="{ name: 'topics-id', params:{ id: topic.id } }">
					{{ topic.id }} | {{ topic.title }}
				</nuxt-link>
			</h5>
			<div v-if="isAuthenticated">
				<div v-if="user.id == topic.user.id"
				  style="width:100px;float:right">
					<nuxt-link 
						:to="{ name: 'topics-edit-id', params:{ id: topic.id } }">
						<button class="btn btn-outline-info btn-sm">
							<i class="fa fa-edit fa-2x"></i>
						</button>
					</nuxt-link>
					<button 
						@click="deleteTopic(topic.id)"
						class="btn btn-outline-danger btn-sm">
						<i class="fa fa-trash fa-2x"></i>
					</button>
				</div>
			</div>
			<p class="text-muted">{{ topic.created_at }} by {{ topic.user.name }}</p>
			<posts :topic="topic"></posts>
		</div>
		<nav>
			<ul class="pagination justify-content-center">
				<li v-for="(key, value) in links" class="page-item">
					<a @click="paginate(key)" href="#" class="page-link">{{ value }}</a>
				</li>
			</ul>
		</nav>
	</div>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Posts from '@/components/posts';
export default {
  name: 'topics',
  components: {
  	posts: Posts
  },
  data() {
    return {
    }
  },
  async fetch(context) {
  	let response = await context.$axios.get('/topics');
  	context.store.dispatch('topics/setTopics', response.data.data);
  	context.store.dispatch('topics/setLinks', response.data.links);
  },
  methods: {
  	...mapActions({
  		paginate: 'topics/paginate'
  	}),
  	async deleteTopic(id) {
  		let yn = confirm('Are you sure you want to delete this topic?');
  		if(!yn) { return; }
  		await this.$store.dispatch('topics/deleteTopic', id);
  		alert('Topic deleted successfully');
  		this.$router.push('/topics');
  	}
  },
  computed: {
  	...mapGetters({
  		topics: 'topics/topics',
  		links: 'topics/links'
  	}),
  }
};
</script>

<style lang="css" scoped>
.topics {
	padding:8px; 
	border-radius: 5px;
}
.btn-outline-danger,
.btn-outline-info {
	border:none;
}
</style>
