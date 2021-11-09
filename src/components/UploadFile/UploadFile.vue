<template>
  <div class="container">
    <h1>UploadFile</h1>
    <input type="file" @change="selectFile" />
    <button class="btn btn-primary" @click="uploadFile()">UploadFile</button>
  </div>
</template>

<script>

import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";

export default {
  name: "UploadFile",
  data() {
    return {
      selectedFile: null,
    };
  },
  mounted () {
      if (getAuth().currentUser == null) {
          this.$router.push("/login");
      }
  },
  methods: {
    selectFile(event) {
      console.log(event);
      this.selectedFile = event.target.files;
    },
    uploadFile() {
      try {
        const storage = getStorage();
        for (var i=0; i<this.selectedFile.length; i++) {
            console.log("el tipos es" + this.selectedFile[i] + this.selectedFile[i].name);
            const storageRef = ref(storage, "/" + getAuth().currentUser.uid + "/" + this.selectedFile[i].name);
            uploadBytes(storageRef, this.selectedFile[i]);
        }
        
        
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
</style>