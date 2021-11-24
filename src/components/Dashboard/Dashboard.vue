<template>
  <div>
    <h1>Dashboard</h1>
    <!-- <h2>{{ userData }}</h2> -->
    <h2>User Files</h2>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">
        <div class="col"  v-for="file,index in userFilesList" :key="file + index">
          <div class="card shadow-sm">
            <img :src="file.icono"/>

            <div class="card-body">
              <h5 class="card-text">{{file.name}}</h5>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group"> 
                  <a :href="file.url" class="btn btn-sm btn-outline-secondary">Download</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, listAll } from "firebase/storage";
import {logo} from "../../assets/logo.png";
import formats from "../../assets/json/files";


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
            //var urlIcon = "";
            getDownloadURL(itemRef).then(url=>{
              console.log(url);
              var icono = "";
              formats.formatos.forEach(formato=>{
                console.log(formato);
                console.log(itemRef.name.substring(itemRef.name.lastIndexOf(".") +1, itemRef.name.length).toLowerCase());
                if (itemRef.name.substring(itemRef.name.lastIndexOf(".") +1, itemRef.name.length).toLowerCase() == formato.formato) {
                  icono = formato.icono;
                }
              })
              this.userFilesList.push({
                name:itemRef.name,
                // url:url
                url : url,
                icono: icono
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