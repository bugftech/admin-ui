<template>
  <DefaultLayout>
    <v-container class="d-flex" :style="{ minHeight: '100%' }">
      <v-row align="center" justify="center">
        <v-col cols="auto" class="text-center">
          <v-img src="@/assets/404.svg" />
          <p class="mt-12 text-h6">Whoops,页面未找到</p>
          <p class="text-caption mb-12">
            请检查 URL 并重试，或者使用搜索栏查找所需的内容。
          </p>

          <v-btn
            prepend-icon="mdi-step-backward"
            to="/"
            variant="flat"
            color="orange-accent-2"
            rounded="xl"
          >
            返回首页
          </v-btn>
          <p></p>
        </v-col>
      </v-row>
    </v-container>
  </DefaultLayout>
</template>

<script setup>
// Components
import DefaultLayout from "@/layouts/default.vue";

// Utilities
import { useHead } from "@unhead/vue";

const route = useRoute();
useHead({
  title: "Page not found",
});
</script>
