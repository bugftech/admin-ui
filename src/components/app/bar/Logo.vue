<template>
  <v-img :src="logo" width="100" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "vuetify";
import darkLogo from "@/assets/bugfreed-text-dark.svg";
import lightLogo from "@/assets/bugfreed-text-light.svg";

defineProps({
  alt: Boolean,
});

const theme = useTheme();

const logo = computed(() => {
  return theme.name.value === "light" ? darkLogo : lightLogo;
});
</script>

<style>
.logo {
  font-size: 0.8rem !important;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: 0.26rem !important;
  font-family: "futura", sans-serif;
  text-transform: uppercase !important;
}
</style>
