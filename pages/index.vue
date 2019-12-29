<template>
<div class="row">
  <div class="col-md-12">
	<div class="full-height">
		<div class="content mb-5">
			<div class="title">
				Laravel Api Development
			<br/>
			Vue/Nuxt Js Web App
			</div>
			<hr/>
		<nuxt-link to="/topics/create"
			class="btn btn-outline-success mr-2">Post a Topic</nuxt-link>
		<nuxt-link to="/topics"
			class="btn btn-outline-info mr-2">Browse Topics</nuxt-link>
		</div>
	</div>
  </div>
</div>
</template>
<style scoped>
	.full-height {
		height: 100vh;
	}
	.content {
		text-align: center;
		margin: 0 auto!important;
		width: 100%;
	}
	.title {
		font-size: 48px;
	}
</style>