<template>
  <div>
    <NavBar />
    <div class="container">
      <router-view />
    </div>
    
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  methods: {
    login() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, "ejemplo2@email.com", "password123")
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
        });
    },
  },
};
</script>

<style>
</style>
