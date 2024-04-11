<template>
  <router-view v-slot="{ Component }">
    <v-fade-transition appear>
      <component :is="Component" />
    </v-fade-transition>
  </router-view>
</template>

<script lang="ts" setup>
import { useHead } from "@unhead/vue";
const route = useRoute();

const meta = computed(() => {
  return {
    title: `${route.meta.title} · Bugfreed Studio`,
    description: route.meta?.description,
    keywords: route.meta?.keywords,
    assets: route.meta?.assets,
    meta: route.meta!,
    link: route.meta?.link,
  };
});

useHead({
  title: computed(() => meta.value.title),
  // link: computed(() => meta.value.link),
});
</script>

<style></style>
