<template>
  <router-view v-slot="{ Component }">
    <v-fade-transition appear>
      <component :is="Component" />
    </v-fade-transition>
  </router-view>
</template>

<script lang="ts" setup>
import { useHead } from "@unhead/vue";

const router = useRouter();
const route = useRoute();
</script>
