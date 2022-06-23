import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vue-toastification/dist/index.css";
import "ant-design-vue/dist/antd.css";
import "fiber-connect-package-v3/styles.css";
import "virtual:windi.css";
import "@/assets/css/main.scss";

const app = createApp(App);
Object.values(import.meta.globEager("./plugins/*.ts")).map((i) =>
  i.install(app)
);

app.use(router);

app.mount("#app");
