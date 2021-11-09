<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
        <router-link class="nav-link" to="/login">Login</router-link>
        <router-link class="nav-link" to="/register">Register</router-link>
        <router-link class="nav-link" to="/upload">Upload</router-link>
        <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
    export default {
        name:"NavBar"
    }
</script>

<style scoped>

</style>