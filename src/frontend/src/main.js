import "regenerator-runtime/runtime";
import Vue from "vue";
import swal from "sweetalert";

import App from "./App.vue";
import "./index.css";

// TODO: Change baseEndpoint to the project on cloud provider
// Heroku = https://xxxx.herokuapp.com
Vue.prototype.$baseEndpoint = "http://localhost:10000";

new Vue({
  el: "#app",
  render: (h) => h(App),
});
