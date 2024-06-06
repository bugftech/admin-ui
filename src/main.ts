/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */


// createApp 必须位于第一个。这样确保加载Auto Imports之前创建Vue实例
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

// Register font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

// Components
import App from "./App.vue";

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon); // Register component globally
library.add(fas); // Include needed solid icons
library.add(far); // Include needed regular icons
library.add(fab); // Include needed brand icons

// fix warning injected property "decorationClasses" is a ref and will be auto-unwrapped
// https://github.com/ueberdosis/tiptap/issues/1719

registerPlugins(app);
app.mount("#app");
