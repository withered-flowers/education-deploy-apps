import { createApp } from "vue";
import App from "./App.vue";

import "./assets/base.css";

// TODO: change this code to provide global variable
// createApp(App).mount("#app");

// TODO: Change baseUrl to the project on cloud provider
// Railway = https://xxxx.up.railway.app
const app = createApp(App);
app.provide("baseUrl", "http://localhost:10000");
app.mount("#app");
