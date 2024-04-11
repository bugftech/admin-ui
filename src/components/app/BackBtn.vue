<template>
  <v-btn
    icon="mdi-arrow-left-bold"
    @click="back"
    size="small"
  >
  </v-btn>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const back = () => {
  router.back();
};
</script>
