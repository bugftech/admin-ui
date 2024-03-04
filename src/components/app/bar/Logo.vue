<template>
  <router-link to="/" class="d-flex ms-4 me-2 text-decoration-none align-center text-white">
    <v-avatar>
      <v-img src="@/assets/bugfreed-transparent.png"></v-img>
    </v-avatar>
    <div class="text-body-2 font-weight-bold" style="font-family: futura">
      BUGFRRED
    </div>
  </router-link>
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
