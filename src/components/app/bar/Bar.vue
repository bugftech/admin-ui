<template>
  <v-app-bar density="comfortable" flat theme="dark">
    <template v-slot:prepend>
      <AppBarLogo />
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
      <template v-if="mdAndUp">
        <AppBarNotificationsMenu />
        <v-btn icon="mdi-dots-grid" v-if="smAndUp" />
        <AppBarUserMenu />
      </template>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useAppStore } from "@/store/app";
const { smAndUp, mdAndUp, mdAndDown } = useDisplay();

const route = useRoute();
const app = useAppStore();
</script>
