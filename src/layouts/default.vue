<template>
  <v-app>
    <AppBarBar />
    <AppSnackBarQueue />
    <AppDrawerDrawer />
    <v-main style="background: #f1f1f1">
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
const route = useRoute();
</script>
