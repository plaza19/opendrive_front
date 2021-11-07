<template>
  <body class="text-center">
    <main class="form-signin">
      <form @submit.prevent="login()">
        <img class="mb-4" src="" alt="" width="72" height="57" />
        <h1 class="h3 mb-3 fw-normal">Login</h1>

        <div class="form-floating">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            v-model="email"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            v-model="password"
          />
          <label for="floatingPassword">Password</label>
        </div>

        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Login
        </button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
      </form>
    </main>
  </body>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const auth = getAuth();
      setPersistence(auth, browserLocalPersistence)
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((res) => {
          console.log(res);
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err.message);
          Swal.fire({
            icon: "error",
            title: "Error.",
            text: err.message,
            footer: '<a href="">Why do I have this issue?</a>',
          });
        });

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
        } else {
          // User is signed out
          // ...
        }
      });
    },
  },
};
</script>

<style  scoped>
@import url("./Login.css");

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>