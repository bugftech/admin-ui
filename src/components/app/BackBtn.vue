<template>
  <v-btn prepend-icon="mdi-arrow-left-bold" @click="back" size="small" variant="tonal">
    返回
  </v-btn>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const back = () => {
  router.back();
};
</script>
