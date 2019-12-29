<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <nuxt-link to="/" class="navbar-brand">Blog</nuxt-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <nuxt-link to="/" class="nav-link">Home</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/topics" class="nav-link">Topics</nuxt-link>
      </li>
    </ul>
    
    <ul class="navbar-nav ml-auto">
      <template v-if="!isAuthenticated">
        <li class="nav-item">
          <nuxt-link 
          to="/login" class="nav-link">Login</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/register" class="nav-link">Register</nuxt-link>
        </li>
      </template>
      <template v-if="isAuthenticated">
         <li class="nav-item">
          <a class="nav-link">{{ user.name }}</a>
        </li>
        <li class="nav-item">
          <a @click.prevent="logout" href="" class="nav-link">Logout</a>
        </li>
      </template>
    </ul>         

  </div>
</nav>
</template>
<script type="text/javascript">
  export default {
    methods: {
      logout() {
        this.$auth.logout();
      }
    }
  }
</script>