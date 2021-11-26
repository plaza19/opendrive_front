<template>
  <div>
    <h1>Dashboard</h1>
    <!-- <h2>{{ userData }}</h2> -->
    <div v-if="totalitems != totalLoaded" class="loading">Loading&#8230;</div>
    <h2>User Files</h2>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">
      <div
        class="col"
        v-for="(file, index) in userFilesList"
        :key="file + index"
      >
        <div class="card shadow-sm">
          <img :src="file.icono" />

          <div class="card-body">
            <h5 class="card-text">{{ file.name }}</h5>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a :href="file.url" class="btn btn-sm btn-outline-secondary"
                  >Download</a
                >
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
import { logo } from "../../assets/logo.png";
import formats from "../../assets/json/files";

export default {
  name: "Dashboard",
  data() {
    return {
      userData: "",
      userFilesList: [],
      totalLoaded: 0,
      totalitems : 0
    };
  },
  components : {
    
  },
  methods: {
    getUserData() {
      const auth = getAuth();
      console.log(auth.currentUser);
      this.userData = auth.currentUser;
    },
    async listAllm() {
      try {
        const storage = getStorage();
        const archivoLocal = logo;
        const auth = getAuth();

        console.log("el tipos es" + archivoLocal);
        console.log("/" + auth.currentUser.uid + "/");
        const storageRef = ref(storage, auth.currentUser.uid);
        listAll(storageRef).then((res) => {
          console.log(res);
          this.totalitems = res.items.length;

          res.items.forEach((itemRef) => {
            //var urlIcon = "";
            getDownloadURL(itemRef).then((url) => {
              console.log(url);
              var icono = "https://cdn-icons-png.flaticon.com/512/633/633585.png";
              formats.formatos.forEach((formato) => {
                console.log(formato);
                console.log(
                  itemRef.name
                    .substring(
                      itemRef.name.lastIndexOf(".") + 1,
                      itemRef.name.length
                    )
                    .toLowerCase()
                );
                if (
                  itemRef.name
                    .substring(
                      itemRef.name.lastIndexOf(".") + 1,
                      itemRef.name.length
                    )
                    .toLowerCase() == formato.formato
                ) {
                  icono = formato.icono;
                }
              });
              this.userFilesList.push({
                name: itemRef.name,
                // url:url
                url: url,
                icono: icono,
              });
              this.totalLoaded +=1;
            });
          }
         );
        }
        );
        
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getUserData();
    this.listAllm();
    if (getAuth().currentUser == null) {
      this.$router.push("/home");
    }
  },
};
</script>

<style scoped>

.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Transparent Overlay */
.loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: '';
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  -webkit-animation: spinner 1500ms infinite linear;
  -moz-animation: spinner 1500ms infinite linear;
  -ms-animation: spinner 1500ms infinite linear;
  -o-animation: spinner 1500ms infinite linear;
  animation: spinner 1500ms infinite linear;
  border-radius: 0.5em;
  -webkit-box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.5) -1.5em 0 0 0, rgba(0, 0, 0, 0.5) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
  box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0, rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
}

/* Animation */

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>