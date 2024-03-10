<template>
  <v-toolbar class="rounded-lg" color="transparent" density="compact">
    <v-breadcrumbs :items="breadcrumbs" class="text-subtitle-2"> </v-breadcrumbs>
    <v-spacer />
    <template v-slot:append>
      <slot />
    </template>
  </v-toolbar>
</template>

<script setup>
import { useBreadcrumbs } from "@/composables/breadcrumb";
const items = computed(() => {
  return [];
});

const { breadcrumbs } = useBreadcrumbs(items);
console.log("items:", breadcrumbs.value);
</script>
