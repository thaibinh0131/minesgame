import Antd from "ant-design-vue";
import type { UserModule } from "@/types/plugin";

export const install: UserModule = (app) => {
  app.use(Antd);
};
