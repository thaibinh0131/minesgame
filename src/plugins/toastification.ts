import Toast from "vue-toastification";
import type { UserModule } from "@/types/plugin";

export const install: UserModule = (app) => {
  app.use(Toast);
};
