/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  extendRoutes: setupLayouts,
});

router.addRoute({
  path: "/:pathMatch(.*)*",
  name: 'NotFound',
  component: () => import("@/layouts/404.vue"),
});


console.log(router.getRoutes())
export default router;
