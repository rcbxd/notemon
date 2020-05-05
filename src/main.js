import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as firebase from "firebase";
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


Vue.use(VueMaterial)

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyBsINObI4_U1Ae9iVypRpU2vg6fPzhjBSU",
  authDomain: "note-app-34032.firebaseapp.com",
  databaseURL: "https://note-app-34032.firebaseio.com",
  projectId: "note-app-34032",
  storageBucket: "note-app-34032.appspot.com",
  messagingSenderId: "773844504028",
  appId: "1:773844504028:web:3d04780efb7db097dd5319",
  measurementId: "G-CHE6L26ZYS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
