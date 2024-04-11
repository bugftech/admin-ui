<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <AppBreadcrumb />
      </v-col>
      <v-col cols="12">
        <v-chip prepend-icon="mdi-view-grid-plus" class="font-weight-bold ms-4 text-caption" color="orange-accent-2" variant="elevated">
          {{ apps.length }}个应用
        </v-chip>

        <v-icon color="grey"> mdi-pan-right </v-icon>
        <v-chip
          v-for="(app, i) in apps"
          :key="i"
          variant="tonal"
          class="ml-2 text-caption font-weight-bold"
        >
          <template v-slot:prepend>
            <v-avatar :color="app.appType === 0 ? 'green' : 'blue'" start>
              <v-icon>{{ app.appType === 0 ? "mdi-wechat" : "" }}</v-icon>
            </v-avatar>
          </template>
          {{ app.name }}
        </v-chip>
      </v-col>
      <v-col cols="12" md="6">
        <ChartUserRegister />
      </v-col>
      <v-col cols="12" md="6">
        <ChartOrder />
      </v-col>
      <v-col cols="12" md="6">
        <ChartUserView />
      </v-col>
      <v-col cols="12" md="6">
        <ChartPageView />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { App } from "@/interfaces/apps";
const apps = ref<App[]>([]);

onMounted(async () => {
  const { success, data } = await BFSDK.getApps();
  if (success) {
    apps.value = data;
  }
});
</script>

<route lang="yaml">
meta:
  title: "资源概览"
  breadcrumb: "应用中心"
</route>
