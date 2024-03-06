import "./assets/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import CKEditor from "@ckeditor/ckeditor5-vue";
import Swal from "sweetalert2";
window.Swal = Swal;
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(CKEditor);

app.mount("#app");
