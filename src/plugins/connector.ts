import ConnectPlugin from "fiber-connect-package-v3";
import type { UserModule } from "@/types/plugin";

export const install: UserModule = (app) => {
  app.use(ConnectPlugin);
};
