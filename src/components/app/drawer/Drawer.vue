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
      <AppDrawerPrepend />
    </template>
    <v-divider />
    <AppDrawerList :items="app.navItems" />
    <v-divider />
    <v-list nav density="compact" slim>
      <v-list-item link>
        <template v-slot:prepend>
          <v-icon size="small">mdi-dots-grid</v-icon>
        </template>
        <v-list-item-title class="text-caption"> 所有的服务 </v-list-item-title>
      </v-list-item>
    </v-list>
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
