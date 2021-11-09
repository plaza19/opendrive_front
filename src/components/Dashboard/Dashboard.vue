<template>
  <div>
    <h1>Dashboard</h1>
    <!-- <h2>{{ userData }}</h2> -->
    <h2>User Files</h2>
    <h3 v-for="file in userFilesList" :key="file">{{file}}</h3>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, listAll } from "firebase/storage";
import {logo} from "../../assets/logo.png"

export default {
  name: "Dashboard",
  data() {
    return {
      userData: "",
      userFilesList:[]
    };
  },
  methods: {
    getUserData() {
      const auth = getAuth();
      console.log(auth.currentUser);
      this.userData = auth.currentUser;
    },
    getFiles() {
    //   var storage = getStorage();
    //   console.log("hola" + JSON.stringify(storage));
    //   const reference = ref(storage, "/");
    //   console.log(reference);
    //   listAll(reference).then((res) => {
    //     res.prefixes.forEach(function (folderRef) {
    //       console.log("folderRef" + folderRef);
    //     });
    //     res.items.forEach(function (itemRef) {
    //       // All the items under listRef.
    //       console.log("ItemRef" + itemRef);
    //     });
    //   });
    },
    async listAllm() {
        try {
        const storage = getStorage();
        const archivoLocal = logo;
        const auth = getAuth();
        
      
        console.log("el tipos es" + archivoLocal);
        console.log("/" + auth.currentUser.uid + "/");
        const storageRef = ref(storage, auth.currentUser.uid);
        listAll(storageRef).then(res=> {
          console.log(res);

          res.items.forEach(itemRef=>{
            getDownloadURL(itemRef).then(url=>{
              console.log(url);
              this.userFilesList.push({
                name:itemRef._location.path_,
                // url:url
              })
            })
          })
        });

        

        }catch(err) {
            console.log(err);
        }


    }
  },
  mounted() {
    this.getUserData();
    this.getFiles();
    this.listAllm();
  },
};
</script>

<style scoped>
</style>