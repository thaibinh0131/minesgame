import { fileURLToPath, URL } from "url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";
import WindiCSS from "vite-plugin-windicss";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import path from "path";
import inject from "@rollup/plugin-inject";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      /* options */
      imports: ["vue", "vue-router", "vue-i18n"],
      dts: "src/auto-imports.d.ts",
    }),
    Pages({
      extensions: ["vue"],
      pagesDir: [{ dir: "src/**/pages", baseRoute: "" }],
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // relative paths to the directory to search for components
      dirs: ["src/**/components"],
      extensions: ["vue"],
      // search for subdirectories
      deep: true,
      dts: "src/components.d.ts",
      // allow auto import and register components
      include: [/\.vue$/, /\.vue\?vue/],
      // custom resolvers
    }),
    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS(),
    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, "locales/**")],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
      vue3Apexcharts: path.resolve(
        __dirname,
        "./node_modules/vue3-apexcharts/dist/vue3-apexcharts.common.js"
      ),
      apexcharts: path.resolve(
        __dirname,
        "./node_modules/apexcharts/dist/apexcharts.min.js"
      ),
    },
  },
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ["buffer", "Buffer"] })],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      exclude: [
        "node_modules/lodash-es/**",
        "node_modules/@types/lodash-es/**",
      ],
    },
  },
});
