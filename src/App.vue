<template>
  <router-view v-slot="{ Component }">
    <v-fade-transition appear>
      <component :is="Component" />
    </v-fade-transition>
  </router-view>
</template>

<script lang="ts" setup>
import { useHead } from "@unhead/vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

console.log("route.meta:", route.meta);
const meta = ref({
  title: `${route.meta.title} - Bugfreed`,
  description: route.meta.description,
  keywords: route.meta.keywords,
  assets: route.meta.assets,
  meta: route.meta,
  link: route.meta.link,
});

useHead({
  title: computed(() => meta.value.title),
  //meta: computed(() => meta.value.meta),
  // link: computed(() => meta.value.link),
});
</script>

<style></style>
