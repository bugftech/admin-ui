<template>
  <v-toolbar class="rounded-0 px-4 border" density="compact" color="transparent">
    <v-chip label size="small">
      {{ breadcrumbs }}
      <v-breadcrumbs
        :items="breadcrumbs"
        class="text-caption font-weight-medium"
      >
      </v-breadcrumbs>
    </v-chip>
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
</script>
