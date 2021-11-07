import Vue from 'vue'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import VueRouter from 'vue-router';
import Register from "./components/Register/Register.vue";
import Login from "./components/Login/Login.vue";
import Dashboard from "./components/Dashboard/Dashboard.vue";


Vue.config.productionTip = false;

Vue.use(VueRouter);

const firebaseConfig = {

  apiKey: "AIzaSyAKjVXSLnlyxxl-xD_oN0vnVtfstR1eT7k",

  authDomain: "opendrive-f91ef.firebaseapp.com",

  projectId: "opendrive-f91ef",

  storageBucket: "opendrive-f91ef.appspot.com",

  messagingSenderId: "1013841102937",

  appId: "1:1013841102937:web:b750901143cca89550c948"

};

const app = initializeApp(firebaseConfig);
console.log(app);


const routes = [
  {path:"/register", component: Register},
  {path:"/login", component: Login},
  {path:"/dashboard", component: Dashboard}
];

const router = new VueRouter({
  routes,
  mode:"history"
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
