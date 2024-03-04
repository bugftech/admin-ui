<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="app.drawer"
    width="240"
    :order="mobile ? -1 : undefined"
    style="background: #ebebeb"
    floating
  >
    <template v-slot:prepend>
      <AppDrawerList :items="app.navItems" />
    </template>
    <template v-slot:append>
      <AppDrawerAppend />
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { useAppStore } from "@/store/app";

const app = useAppStore();
const { mobile } = useDisplay();
</script>
