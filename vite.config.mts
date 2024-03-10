// Plugins
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Fonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss",
      },
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // 名字拼接到组件内
      directoryAsNamespace: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({
      layoutsDirs: "src/layouts",
      importMode(name) {
        return name === "home" ? "sync" : "async";
      },
    }),
    Fonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
    AutoImport({
      imports: [
        {
          vue: [
            "camelize",
            "computed",
            "h",
            "mergeProps",
            "nextTick",
            "onBeforeMount",
            "onBeforeUnmount",
            "onMounted",
            "onScopeDispose",
            "onServerPrefetch",
            "ref",
            "shallowRef",
            "useAttrs",
            "watch",
            "watchEffect",
          ],
          vuetify: ['useDate', 'useDisplay', 'useGoTo', 'useRtl', 'useTheme'],
          'vue-router': ['onBeforeRouteLeave', 'onBeforeRouteUpdate', 'useRoute', 'useRouter'],
          pinia: ['defineStore', 'storeToRefs'],
        },
      ],
      dts: true,
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 4000,
  },
});