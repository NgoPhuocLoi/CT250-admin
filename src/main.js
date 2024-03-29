import "./assets/base.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import { createApp } from "vue";

import App from "./App.vue";
import store from "./stores";
import router from "./router";
import CKEditor from "@ckeditor/ckeditor5-vue";
import Swal from "sweetalert2";
import PrimeVue from 'primevue/config';
window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

window.Toast = Toast;

const app = createApp(App);
app.use(store);
app.use(router);
app.use(CKEditor);
app.use(PrimeVue);

app.mount("#app");
