<template>
  <div class="container">
    <h1>UploadFile</h1>
    <input type="file" @change="selectFile" />
    <button class="btn btn-primary" @click="uploadFile()">UploadFile</button>
    <br />
    <p>Progress</p>
    <progress max="100" :value="progress"></progress
    ><span>{{ progress }}%</span>
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="(file, index) in selectedFile"
        :key="file + index"
      >
        {{ file.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

export default {
  name: "UploadFile",
  data() {
    return {
      selectedFile: null,
      progress: 0,
    };
  },
  mounted() {
    if (getAuth().currentUser == null) {
      this.$router.push("/home");
    }
  },
  methods: {
    selectFile(event) {
      this.progress = 0;
      console.log(event.target.files);
      this.selectedFile = event.target.files;
      //console.log(this.selectedFile);
      for (var i = 0; i < this.selectedFile.length; i++) {
        this.selectedFile[i].progress = 0;
      }
    },
    uploadFile() {
      try {
        this.totalBytes = 0;
        this.totalTranfer = 0;
        const storage = getStorage();
        for (var i = 0; i < this.selectedFile.length; i++) {
          console.log(
            "el tipos es" + this.selectedFile[i] + this.selectedFile[i].name
          );
          const storageRef = ref(
            storage,
            "/" + getAuth().currentUser.uid + "/" + this.selectedFile[i].name
          );
          this.totalBytes += this.selectedFile[i].size;
          const uploadTask = uploadBytesResumable(
            storageRef,
            this.selectedFile[i]
          );
          uploadTask.on("state_changed", (snapshot) => {
            this.progress = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            snapshot.task.then((res) => {
              console.log(res + "subidooo");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "File " + res.metadata.name + " Uploaded",
                showConfirmButton: false,
                timer: 1500,
              });
            });
          });
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