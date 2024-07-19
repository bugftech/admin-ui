<template>
  <v-app>
    <AppSnackBarQueue />
    <v-app-bar flat app color="transparent">
      <v-spacer />
      <v-img src="@/assets/bugfreed-text-dark.svg" height="14px"/>
      <v-spacer />
    </v-app-bar>
    <v-main >
      <slot>
        <router-view v-slot="{ Component }">
          <v-fade-transition hide-on-leave>
            <component :is="Component" :key="route.name" />
          </v-fade-transition>
        </router-view>
      </slot>
    </v-main>
    <v-footer app class="d-flex justify-center" color="transparent">
      <div class="text-caption font-weight-medium text-grey">
        ©️ 沪ICP备2023008148号-1
      </div>
    </v-footer>
  </v-app>
</template>

<script setup>
const route = useRoute();
</script>
