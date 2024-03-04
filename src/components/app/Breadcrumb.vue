<template>
  <v-toolbar class="rounded-lg" color="transparent">
    {{ ("items:", items) }}
    <v-breadcrumbs :items="items" class="text-subtitle-2"> </v-breadcrumbs>
    <v-spacer />
    <template v-slot:append>
      <slot />
    </template>
  </v-toolbar>
</template>

<script setup>
import { useBreadcrumbs } from "@/composables/breadcrumb";
const { items } = useBreadcrumbs();
</script>
