<template>
  <v-app-bar flat>
    <template v-slot:prepend>
      <v-btn
        icon="mdi-menu"
        v-if="route.meta.layout !== 'home' && mdAndDown"
        @click="app.drawer = !app.drawer"
      ></v-btn>
    </template>
    <v-spacer> </v-spacer>
    <AppBarSearchDialog />
    <v-spacer> </v-spacer>
    <template v-slot:append>
      <AppBarThemeToggleBtn />
      <template v-if="mdAndUp">
        <AppBarNotificationsMenu />
        <AppBarUserMenu />
      </template>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useAppStore } from "@/store/app";
const { mdAndUp, mdAndDown } = useDisplay();

const route = useRoute();
const app = useAppStore();
</script>
