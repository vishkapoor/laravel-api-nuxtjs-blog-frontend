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
		<p class="text-muted">
			{{ post.created_at }} by {{ post.user.name }}
			<span
				@click="likePost(post)" 
				class="btn btn-outline-primary fa fa-thumbs-up">
				<span class="badge ">{{ post.likes_count }}</span>
			</span>
		</p>
		
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
  	},
  	async likePost(post) {
  		const loggedInUser = this.$store.getters['user'];
  		
  		if(!loggedInUser) {
  			this.$router.push('/login');
  			return;
  		}

  		if(loggedInUser && loggedInUser.id === post.user.id) {
  			alert('You cannot like your own post.');
  			return;
  		}
  		if(loggedInUser && post.liked_by_users) {
  			if(post.liked_by_users.some(user => user.id === loggedInUser.id)) {
  				alert('You have already liked this post.');
  				return;
  			}
  		}

  		await this.$store.dispatch('posts/likePost', post);

  	}
  }
};
</script>

<style lang="css" scoped>
.btn-outline-danger,
.btn-outline-primary,
.btn-outline-info {
	border:none;
}
</style>
