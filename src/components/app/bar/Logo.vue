<template>
  <div class="ms-4">
    <v-img src="@/assets/bugfreed-text.svg" style="width: 100px"></v-img>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay, useTheme } from "vuetify";

defineProps({
  alt: Boolean,
});

const { lgAndUp } = useDisplay();
const theme = useTheme();

const logo = computed(() => {
  const file = `${theme.name.value}.svg`;
  const logo = "vuetify-logo-v3-slim";

  return `${logo}-${lgAndUp.value ? "text-" : ""}${file}`;
});
</script>
