<template>
  <v-btn icon="mdi-theme-light-dark" @click="changeTheme"> </v-btn>
</template>

<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();

const themeMode = ref("light");
const changeTheme = () => {
  themeMode.value = themeMode.value === "light" ? "dark" : "light";
  theme.global.name.value = themeMode.value;
};
</script>
