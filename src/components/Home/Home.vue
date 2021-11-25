<template>
  <div class="px-4 py-5 my-5 text-center">
    <img class="mb-4" src="../../assets/images/logo_transparent.png" alt="" width="150" height="150" />
    <h1 class="display-5 fw-bold">OpenDrive</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">A free and open site to upload your files</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <router-link to="/dashboard" class="btn btn-primary btn-lg px-4 gap-3">Dashboard</router-link>
        <router-link to="/register" class="btn btn-outline-secondary btn-lg px-4">Register</router-link>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; Diego Plaza 2021</p>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
</style>