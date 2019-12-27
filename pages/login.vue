<template>
<div class="container col-md-6 mt-5">
	<h2>Login</h2>
	<form @submit.prevent="submit">
	  <div class="form-group">
	    <label>Email address</label>
	    <input type="email" 
	    	v-model.trim="form.email"
	    	autofocus 
	    	class="form-control" 
	 		placeholder="Enter email">
		    <small v-if="errors.email" class="form-text text-danger">
		    	{{ errors.email[0] }}
		    </small>
	  </div>
	  <div class="form-group">
	    <label>Password</label>
	    <input type="password"
	    	v-model.trim="form.password"
	    	class="form-control" 
	    	placeholder="Password">
	    <small v-if="errors.password" class="form-text text-danger">
	    	{{ errors.password[0] }}
	    </small>
	  </div>
	  <button 
	  	type="submit" 
	  	class="btn btn-primary">Submit</button>
	</form>
	<br/>
	<p>
		Don't have an account? <nuxt-link to="/register">Register</nuxt-link>
	</p>
</div>
</template>
<script>
export default {
  name: 'login',
  middleware: [
  	'guest'
  ],
  data() {
    return {
    	form: {
    		email: '',
    		password: '',
    	}
    };
  },
  methods: {
  	async submit() {
  		try {
	  		await this.$auth.loginWith("local", {
	  			data: this.form
	  		});

	  		this.$router.push({
	  			path: this.$route.query.redirect || "/profile"
	  		});

  		} catch(e) {
  			console.log(e);
  		}
  	}
  }
};
</script>

<style lang="css" scoped>
</style>
