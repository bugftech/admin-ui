<template>
  <v-app>
    <VAppBar flat> </VAppBar>
    <VNavigationDrawer> </VNavigationDrawer>
    <v-main>
      <slot>
        <router-view v-slot="{ Component }">
          <v-fade-transition hide-on-leave>
            <div :key="route.name">
              <component :is="Component" />
            </div>
          </v-fade-transition>
        </router-view>
      </slot>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const items = [
  {

  },
];
</script>

<style>
.dark {
  background: black;
}

.light {
  background: #f1f1f1;
}
</style>
