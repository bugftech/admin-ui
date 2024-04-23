<template>
  <v-app>
    <AppSnackBarQueue />
    <AppDrawerDrawer />
    <AppBarBar />
    <v-main :class="mode">
      <slot>
        <router-view v-slot="{ Component }">
          <v-fade-transition hide-on-leave>
            <div :key="route.name">
              <component :is="Component" />
            </div>
          </v-fade-transition>
        </router-view>
      </slot>
    </v-main>
  </v-app>
</template>

<script setup>
import { useTheme } from "vuetify";
import { useRoute } from "vue-router";

const route = useRoute();
const theme = useTheme();

const mode = computed(() => {
  return theme.global.name.value;
});
</script>

<style>
.dark {
  background: black;
}

.light {
  background: #f1f1f1;
}
</style>
