<template>
<div class="row">
	<div class="col-md-6 offset-3">
		<h4>Create a new topic</h4>
		<hr/>
		<form @submit.prevent="create">
		  <div class="form-group">
		    <label>Title</label>
		    <input type="text" 
		    	v-model.trim="form.title"
		    	autofocus 
		    	class="form-control" 
		 		placeholder="Enter Title">
			    <small v-if="errors.title" class="form-text text-danger">
			    	{{ errors.title[0] }}
			    </small>
		  </div>
		  <div class="form-group">
		    <label>Body</label>
		    <textarea class="form-control" rows="7" v-model="form.body"></textarea>
		    <small v-if="errors.body" class="form-text text-danger">
		    	{{ errors.body[0] }}
		    </small>
		  </div>
		  <button 
		  	type="submit" 
		  	class="btn btn-primary">Create</button>
		</form>
	</div>
</div>
</template>

<script>
export default {
	middleware: ['auth'],
 	name: 'CreateTopic',
 	data() {
    	return {
    		form: {
    			title: '',
    			body: '',
    		}
    	}
  	},
  	methods: {
  		async create() {
  			try {
  				let yn = confirm('Are you sure you want to perform this action?')
  				if(!yn) { return; }
  				await this.$store.dispatch('topics/create', this.form)
  				alert('Topic created successfully.');
  				this.$router.push('/topics');
  			} catch(e) {console.log(e)};
  		}
  	}
};
</script>

<style lang="css" scoped>
</style>
