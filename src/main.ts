/* eslint-disable */
import { createApp } from "vue";
import Toast from "vue-toastification";

import App from "./App.vue";
import store from "./store";
import router from "./router";

const toastOptions = {
  timeout: 3000,
  position: "top-right",
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true
};

import "@/assets/scss/application.scss";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Toast, toastOptions);

app.mount("#app");
