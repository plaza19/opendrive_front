<template>
  <div>
    <label class="form-label"> Email to send Password recover Link </label>
    <input type="text" class="form-control" v-model="email" />
    <button class="btn btn-success" @click="sendEmail">Send Email</button>
  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";

export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    sendEmail() {
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email).then((res) => {
          console.log(res);
        this.$router.push("/login");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Email sended",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    },
  },
};
</script>

<style scoped>
</style>