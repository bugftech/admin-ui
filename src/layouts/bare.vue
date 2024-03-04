<template>
  <v-app>
    <AppSnackBarQueue />
    <v-main>
      <slot>
        <router-view v-slot="{ Component }">
          <v-fade-transition hide-on-leave>
            <component :is="Component" :key="route.name" />
          </v-fade-transition>
        </router-view>
      </slot>
    </v-main>
  </v-app>
</template>

<script setup>
const route = useRoute();
</script>
