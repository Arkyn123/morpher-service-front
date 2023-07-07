import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";

const app = createApp(App);
const api = axios.create({ baseURL: "http://localhost:3000" });
app.config.globalProperties.$api = api;
app.config.globalProperties.$axios = axios;

app.mount("#app");

export { axios, api };
