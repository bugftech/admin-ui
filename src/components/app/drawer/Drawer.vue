<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="app.drawer"
    width="240"
    :order="mobile ? -1 : undefined"
    floating
  >
    <template v-slot:prepend>
      <v-divider />
      <AppDrawerPrepend />
    </template>
    <v-divider />
    <AppDrawerList :items="app.navItems" />
    <v-divider />
    <v-list nav density="compact" slim>
      <v-list-item link to="/apps">
        <template v-slot:prepend="{ isActive }">
          <v-icon
            size="small"
            :icon="
              isActive
                ? 'mdi-application-array'
                : 'mdi-application-array-outline'
            "
          />
        </template>
        <v-list-item-title class="text-caption">所有应用</v-list-item-title>
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
