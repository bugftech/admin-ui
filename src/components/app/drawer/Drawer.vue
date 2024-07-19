<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="app.drawer"
    :rail="rail"
    :order="mobile ? -1 : undefined"
  >
    <template v-slot:prepend>
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
          <v-list-item-title class="text-caption">应用</v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
    <v-divider />
    <AppDrawerList :items="app.navItems" />
    <template v-slot:append>
      <v-divider />
      <v-sheet
        class="d-flex align-center text-caption justify-space-between px-1"
      >
        <v-btn
          :icon="rail ? 'mdi-menu-left' : 'mdi-menu-right'"
          @click="rail = !rail"
          size="small"
          variant="flat"
        />

        <v-btn
          v-if="!rail"
          prepend-icon="mdi-search-web"
          size="small"
          variant="tonal"
          >探索应用模版</v-btn
        >
      </v-sheet>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { useAppStore } from "@/store/app";

const rail = ref(false);
const app = useAppStore();
const { mobile } = useDisplay();
</script>
