<template>
<div>
	<div v-for="(post, postIndex) in topic.posts" 
		:key="postIndex" class="ml-5 mt-5 content">
		<p>{{ post.id }} - {{ post.body }}</p>
		<div v-if="isAuthenticated">
			<div v-if="user.id == post.user.id"
			  style="width:100px;float:right">
				<nuxt-link 
					:to="{ name: 'topics-posts-edit-id', params:{ topicId: post.topic_id, id: post.id } }">
					<button class="btn btn-outline-info btn-sm">
						<i class="fa fa-edit fa-2x"></i>
					</button>
				</nuxt-link>
				<button 
					@click="deletePost(post.id)"
					class="btn btn-outline-danger btn-sm">
					<i class="fa fa-trash fa-2x"></i>
				</button>
			</div>
		</div>
		<p class="text-muted">{{ post.created_at }} by {{ post.user.name }}</p>
	</div>
</div>
</template>
<script>
export default {
  props: {
  	topic: {
  		type: Object,
  		required: true
  	}
  },
  data() {
    return {

    };
  },
  methods: {
  	async deletePost(id) {
  		let yn = confirm('Are you sure you want to delete this post?');
  		if(!yn) { return; }
  		await this.$store.dispatch('posts/deletePost', {
  			topic_id: this.topic.id,
  			id: id
  		});
  		alert('Post deleted successfully');
  	}
  }
};
</script>

<style lang="css" scoped>
.btn-outline-danger,
.btn-outline-info {
	border:none;
}
</style>
