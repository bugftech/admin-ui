/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import head from "./head"
// import CKEditor from '@ckeditor/ckeditor5-vue';
import { vuetifyProTipTap } from './tiptap'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(head)
    .use(router)
    .use(pinia)
    .use(vuetifyProTipTap)
}
