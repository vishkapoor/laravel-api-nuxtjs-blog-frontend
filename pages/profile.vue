<template>
	<div class="row">
		<div class="col-md-12">
			<h3>User Profile</h3>
		</div>
	</div>
</template>

<script>
export default {
	middleware: ['auth'],
 	name: 'profile',
 	data() {
    	return {

    	};
  	},
};
</script>

<style lang="css" scoped>
</style>
